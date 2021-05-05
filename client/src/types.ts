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
