export interface PostType {
  _id: string;
  username: string;
  title: string;
  contents: string;
  tag: 'All' | 'Programming' | 'Media' | 'Technology' | 'Community' | 'Others';
  created_date: number;
  imgUrl: string;
}

export interface EditType {
  username: string;
  title: string;
  contents: string;
  tag: 'All' | 'Programming' | 'Media' | 'Technology' | 'Community' | 'Others';
}

export interface AuthType {
  username: string;
  isAuth: boolean;
  errorMessage: string;
}

export interface SearchType {
  searchWord: string;
  recentSearchArr: string[];
}

export interface SearchResultType {
  _id: string;
  username: string;
  title: string;
  tag: string;
  modified_data: number;
  created_date: number;
  contents: string;
  imgUrl: string;
}
