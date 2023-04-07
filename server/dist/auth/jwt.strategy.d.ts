import { Strategy } from 'passport-jwt';
import { GenerateTokenPayloadDto } from 'src/tokens/dto/generate-token-payload.dto';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: GenerateTokenPayloadDto): Promise<{
        userId: number;
        email: string;
    }>;
}
export {};
