import $api from "../server";
import { AxiosResponse } from "axios";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api
      .post<AuthResponse>("/auth/login", {
        email,
        password,
      });
  }

  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse | unknown>> {
    return $api.post<AuthResponse>("/auth/registration", {
      email,
      password,
    });
  }

  static async logout(): Promise<void> {
    return $api.get("/logout");
  }
}
