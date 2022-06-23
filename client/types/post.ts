interface PostType {
  _id: string;
  writer: string;
  title: string;
  contents: string;
  tag: 'All' | 'Programming' | 'Media' | 'Technology' | 'Community' | 'Others';
  created_date: number;
}

export type { PostType };
