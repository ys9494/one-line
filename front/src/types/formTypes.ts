export type ResponseType = {
  data?: any;
};

export type UserFormType = ResponseType & {
  nickname: string;
  bio: string;
  blogName: string;
  image: any;
};

export type CategoryFormType = ResponseType & {
  name: string;
};

export type CommentFormType = ResponseType & {
  content: string;
};

export type PostFormType = ResponseType & {
  title?: string;
  content?: string;
  summary?: string;
  categoryId?: string;
};
