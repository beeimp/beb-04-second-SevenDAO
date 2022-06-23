export interface PostType {
  _id: number;
  writer: string;
  title: string;
  contents: string;
  tag: 'All' | 'Programming' | 'Media' | 'Technology' | 'Community' | 'Others';
  created_date: number;
}
