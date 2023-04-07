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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcryptjs");
const tokens_service_1 = require("../tokens/tokens.service");
const user_dto_1 = require("../users/dto/user.dto");
let AuthService = class AuthService {
    constructor(prisma, tokensService) {
        this.prisma = prisma;
        this.tokensService = tokensService;
    }
    async generateTokens(user) {
        const payload = { email: user.email, sub: user.id };
        const tokens = await this.tokensService.generateTokens(payload);
        return Object.assign(Object.assign({}, tokens), { user });
    }
    async registration(dto) {
        const candidate = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (candidate) {
            throw new common_1.HttpException('User already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = bcrypt.hashSync(dto.password, 5);
        const user = await this.prisma.user.create({
            data: Object.assign(Object.assign({}, dto), { password: hashedPassword }),
        });
        const userDto = new user_dto_1.UserDto(user);
        const tokens = await this.generateTokens(user);
        await this.tokensService.saveToken(user.id, tokens.refreshToken);
        return Object.assign(Object.assign({}, tokens), { user: userDto });
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            throw new common_1.HttpException("User with such email doesn't exist", common_1.HttpStatus.UNAUTHORIZED);
        }
        const isPasswordEqual = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordEqual) {
            throw new common_1.HttpException('Password is incorrect', common_1.HttpStatus.BAD_REQUEST);
        }
        const tokens = await this.generateTokens(user);
        await this.tokensService.saveToken(user.id, tokens.refreshToken);
        const userDto = new user_dto_1.UserDto(user);
        return Object.assign(Object.assign({}, tokens), { user: userDto });
    }
    async logout(refreshToken) {
        const tokenData = await this.tokensService.removeToken(refreshToken);
        return tokenData;
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        const userData = await this.tokensService.validateRefreshToken(refreshToken);
        const tokenFromDb = await this.prisma.token.findUnique({
            where: { refreshToken },
        });
        if (!userData || !tokenFromDb) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        const user = await this.prisma.user.findUnique({
            where: { id: userData.sub },
        });
        const tokens = await this.generateTokens(user);
        const userDto = new user_dto_1.UserDto(user);
        await this.tokensService.saveToken(user.id, tokens.refreshToken);
        return Object.assign(Object.assign({}, tokens), { user: userDto });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        tokens_service_1.TokensService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map