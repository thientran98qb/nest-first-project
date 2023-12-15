import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RegisterDto } from './dto';
import { User } from '../users/entities/user.entity';
import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { EnvService } from '../config/env/env.service';
import { IUserRepository, UserRepository } from '../users/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: IUserRepository,
    private jwtService: JwtService,
    private envService: EnvService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const dataUsers = {
        ...registerDto,
        password: await argon2.hash(registerDto.password),
      };

      const user = await this.usersRepository.save(dataUsers);
      delete user.password;

      return {
        message: 'Register account success',
        data: user,
      };
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.usersRepository.findUser({
        email: loginDto.email,
      });
      if (!user) {
        throw new HttpException('Email not exists', HttpStatus.NOT_FOUND);
      }

      if (!(await argon2.verify(user.password, loginDto.password))) {
        throw new HttpException(
          'not matching password',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const tokens = await this.getTokenSigned(user);
      this.updateRefreshToken(user.id, tokens.refreshToken);

      return {
        message: 'Login successfully',
        data: {
          email: user.email,
          ...tokens,
        },
      };
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getTokenSigned(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.envService.read().SECRET_JWT,
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.envService.read().SECRET_JWT_REFRESH,
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    return await this.usersRepository.update(
      {
        id: userId,
      },
      {
        refresh_token: refreshToken,
      },
    );
  }

  async refreshToken(userId: number, refreshToken: string) {
    const user = await this.usersRepository.findUser({
      id: userId,
    });
    if (!user || user.refresh_token === null) {
      throw new ForbiddenException('Access denied');
    }
    const refreshTokenMatch = user.refresh_token === refreshToken;

    if (!refreshTokenMatch) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.getTokenSigned(user);
    this.updateRefreshToken(userId, tokens.refreshToken);
    return tokens;
  }

  async logout(user: User) {
    await this.usersRepository.update(
      {
        id: user.id,
      },
      {
        refresh_token: null,
      },
    );
    return {
      msg: 'Logout successfully',
    };
  }
}
