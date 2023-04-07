interface CreatePostDto {
    title: string
    content: string
}

interface RequestUser {
    sub: number;
    email: string;
    iat: number;
    exp: number;
}