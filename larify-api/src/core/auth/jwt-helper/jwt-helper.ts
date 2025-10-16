import { IJwtHelper } from './contracts/i-jwt-helper';
import { AuthPayload } from '../types';
import * as jwt from 'jsonwebtoken';
import { BadRequestError } from '@/core/errors/server-errors/bad-request-error';
import { UnauthorizedError } from '@/core/errors/server-errors/unauthorized-error';

export class JwtHelper implements IJwtHelper {
  private readonly secret: string;

  constructor(secret = process.env.JWT_SECRET) {
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }
    this.secret = secret;
  }

  public generateToken(payload: AuthPayload): Promise<string> {
    if(!payload) {throw new BadRequestError('Payload is required to generate a token');}

    return new Promise((resolve, reject ) => {
        jwt.sign(payload, this.secret, {expiresIn: '1h'}, (err, token) => {
            if(err || !token) {
                return reject(new UnauthorizedError('Error generating token'));
            }
            resolve(token);
        });
    });
  }
  public verifyToken(token: string): Promise<AuthPayload> {
    if(!token) {throw new BadRequestError('Token is required to verify');}

    return new Promise((resolve, reject) => {
        jwt.verify(token, this.secret, (err, decoded) => {
            if(err || !decoded) {
                return reject(new UnauthorizedError('Invalid token'));
            }
            resolve(decoded as AuthPayload);
        });
    }); 
  }
}
