import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    register(body) {
        return {
            message: 'Register account',
            status: 'Done'
        }
    }
};
