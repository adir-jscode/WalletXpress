import { baseApi } from "@/redux/baseApi";

export interface IChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface IChatRequest {
  message: string;
  history?: IChatMessage[];
}

export interface IChatResponse {
  success: boolean;
  message: string;
  data: {
    reply: string;
  };
}

const aiApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    chat: build.mutation<IChatResponse, IChatRequest>({
      query: (body) => ({
        url: "/ai/chat",
        method: "POST",
        data: body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useChatMutation } = aiApi;

export { aiApi };
