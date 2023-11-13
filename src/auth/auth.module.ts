import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { userProviders } from '../users/users.providers';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { UsersService } from '../users/users.service';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
    imports: [
        JwtModule.register({})
    ],
    controllers: [AuthController],
    providers: [...userProviders, AuthService, AccessTokenStrategy, UsersService, RefreshTokenStrategy]
})
export class AuthModule {}
