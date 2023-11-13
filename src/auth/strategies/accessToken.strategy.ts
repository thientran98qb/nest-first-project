import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvService } from "../../config/env/env.service";
import { UsersService } from "../../users/users.service";
import { User } from "../../users/entities/user.entity";

type JwtPayload = {
    sub: string;
    email: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        public envService: EnvService,
        public userService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: envService.read().SECRET_JWT,
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        const user = await this.userService.findUserById(parseInt(payload.sub))        
        delete user.password

        return user
    }
}
