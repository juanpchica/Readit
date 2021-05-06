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
}

export interface User {
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sub {
  name: string;
  title: string;
  description: string;
  createdAt: string;
  imageUrn: string;
  bannerUrn: string;
  posts: Post[];
}
