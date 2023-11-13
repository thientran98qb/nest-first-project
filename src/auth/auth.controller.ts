import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto';
import { LoginDto } from './dto/login.dto';
import { AccessTokenGuard, RefreshTokenGuard } from './guard';
import { Request as RequestN } from 'express';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() body: RegisterDto) {        
        return this.authService.register(body)
    }

    @Post('login')
    login(@Body() body: LoginDto) {        
        return this.authService.login(body)
    }

    @UseGuards(AccessTokenGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @UseGuards(AccessTokenGuard)
    @Post('logout')
    logout(@Req() req: RequestN) {
        return this.authService.logout(req.user as User)
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    getRefreshToken(@Req() req: RequestN) {
        const userId = req.user['sub'];
        const refreshToken = req.user['refreshToken'];
        return this.authService.refreshToken(userId, refreshToken)
    }
}
