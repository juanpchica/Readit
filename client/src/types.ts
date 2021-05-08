export interface Post {
  username: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  subName: string;
  identifier: string;
  title: string;

  // Virtual fields
  url: string;
  voteScore?: number;
  commentCount?: number;
  userVote?: number;
  sub: Sub;
}

export interface User {
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sub {
  name: string;
  username: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  imageUrn: string;
  bannerUrn: string;
  posts: Post[];
  postCount: number;
  //Virtuals
  imageUrl: string;
  bannerUrl: string;
}

export interface Comment {
  identifier: string;
  body: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  // Virtuals
  userVote: number;
  voteScore: number;
}
