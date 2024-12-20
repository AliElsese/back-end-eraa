import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { CustomError } from "src/modules/shared/helpers/customError";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private JwtService: JwtService,

        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new CustomError(401, 'No authorization header provided');
        }

        const token = this.extractToken(authHeader);
        const tokenPayload = this.verifyToken(token);

        request.user = tokenPayload;

        return true;
    }

    private extractToken(authHeader: string): string {
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            throw new CustomError(401, 'Invalid authorization header format');
        }
        return parts[1];
    }

    private verifyToken(token: string): any {
        try {
            return this.JwtService.verify(token);
        } catch (error) {
            throw new CustomError(401, 'Invalid or expired token');
        }
    }
}