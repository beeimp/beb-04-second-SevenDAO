export interface PostType {
  _id: string;
  username: string;
  title: string;
  contents: string;
  tag: 'All' | 'Programming' | 'Media' | 'Technology' | 'Community' | 'Others';
  created_date: number;
  imgUrl: string;
}

export interface AuthType {
  username: string;
  isAuth: boolean;
  errorMessage: string;
}
