import * as jwt from 'jsonwebtoken';

import { IJwtHelper } from './contracts/i-jwt-helper';
import { AuthPayload } from '../_types';
import { Firebase } from '../firebase/firebase';
import { BadRequestError } from '@/core/errors/server-errors/bad-request-error';
import { UnauthorizedError } from '@/core/errors/server-errors/unauthorized-error';

export class JwtHelper implements IJwtHelper {
  private readonly firebase: Firebase;
  private readonly secret: string;

  constructor( secret = process.env.JWT_SECRET) {
    if (!secret ) { throw new Error('JWT_SECRET is not defined');}
     this.secret = secret;
    this.firebase = new Firebase();
    if (!this.firebase) { throw new Error('Firebase is not initialized');}
    
   
  }

  public generateToken(payload: AuthPayload): Promise<string> {
    if (!payload) {
      throw new BadRequestError('Payload is required to generate a token');
    }

    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.secret, { expiresIn: '1h' }, (err, token) => {
        if (err || !token) {
          return reject(new UnauthorizedError('Error generating token'));
        }
        resolve(token);
      });
    });
  }
  public async verifyToken(token: string): Promise<AuthPayload> {
    try {
      if (!token || typeof token !== 'string') {
      throw new BadRequestError('A valid token must be provided for verification');
    }
    return await this.firebase.verifyFirebaseToken(token);
  } catch (err) {
      console.error('Token verification error:', err);
      throw new UnauthorizedError('Token verification failed');
    }
  }
}
