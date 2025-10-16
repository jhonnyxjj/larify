import { IAuthMiddleware } from "./contracts";
import type { AuthRequest } from "../types/auth-payload";



export class AuthMiddleware implements IAuthMiddleware {

public async middlewareAuth(req: Request, securityName: string): Promise<AuthRequest> {

try {
    if(securityName !== 'Jwt') 
}