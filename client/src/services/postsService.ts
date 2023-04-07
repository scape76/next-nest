import $api from "@/server";
import { AxiosResponse } from "axios";

export default class PostsService {
  static getPosts = async (): Promise<AxiosResponse<Post[]>> => {
    return $api.get("posts");
  };

  static createPost = async (
    title: string,
    content: string
  ): Promise<AxiosResponse<Post>> => {
    return $api.post("posts", { title, content });
  };

  static updatePost = async (
    id: number,
    title: string,
    content: string
  ): Promise<AxiosResponse<Post>> => {
    return $api.put<Post>(`posts/${id}`, { title, content });
  };

  static deletePost = async (id: number): Promise<AxiosResponse<Post>> => {
    return $api.delete(`posts/${id}`);
  };
}
