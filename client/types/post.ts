export interface PostType {
  post_id: number;
  writer: string;
  title: string;
  contents: string;
  tag: 'All' | 'Programming' | 'Media' | 'Technology' | 'Community' | 'Others';
  create_date: number;
}
