import { ResponseType } from './formTypes';

type CategoryPost = {
  id: string;
};

export type CategoryType = ResponseType & {
  id: number;
  name: string;
  Posts?: CategoryPost[];
};

export type CommentType = ResponseType & {
  id: number;
  content: string;
  createdAt: string;
  User: {
    nickname: string;
    image?: string;
  };
};

export type LikersType = ResponseType & {
  nickname: string;
};

export type PostType = ResponseType & {
  id: number;
  title: string;
  content: string;
  summary: string;
  views: number;
  createdAt: string;
  Category?: CategoryType;
  User?: {
    nickname: 'hi';
    image?: string;
  };
  Likers?: LikersType[];
  Comments?: CommentType[];
};

export type Follow = {
  id: string;
  nickname: string;
  data?: any;
  isFollowing?: boolean;
};

export type UserType = ResponseType & {
  id: string;
  nickname: string;
  email: string;
  blogName: string;
  bio: string;
  image: string;
  admin: boolean;
  createdAt: string;
  Categories: CategoryType[];
  Posts: PostType[];
  Followers: Follow[];
  Followings: Follow[];
};
