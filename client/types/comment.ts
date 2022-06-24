export interface CommentWriteType {
  postId: string;
  username: string;
  comment: string;
}

export interface CommentType {
  username: string;
  comment: string;
  created_date: number;
}
