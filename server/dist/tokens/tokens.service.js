"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
let TokensService = class TokensService {
    constructor(prismaService, jwtService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
    }
    async generateTokens(payload) {
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '3h',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '10d',
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    async removeToken(token) {
        const tokenData = await this.prismaService.token.delete({
            where: { refreshToken: token },
        });
        return tokenData;
    }
    async saveToken(userId, token) {
        const tokenData = await this.prismaService.token.findUnique({
            where: { userId },
        });
        if (tokenData) {
            const newTokenData = await this.prismaService.token.update({
                where: {
                    userId,
                },
                data: {
                    refreshToken: token,
                },
            });
            return newTokenData;
        }
        const createdToken = await this.prismaService.token.create({
            data: { userId, refreshToken: token },
        });
        return createdToken;
    }
    async validateRefreshToken(token) {
        try {
            const userData = await this.jwtService.verify(token, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
            return userData;
        }
        catch (e) {
            return null;
        }
    }
};
TokensService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], TokensService);
exports.TokensService = TokensService;
//# sourceMappingURL=tokens.service.js.map