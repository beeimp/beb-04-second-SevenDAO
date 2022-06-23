interface PostType {
  post_id: number;
  writer: string;
  title: string;
  category: 'All' | 'Programming' | 'Media' | 'Technology' | 'Community' | 'Others';
  create_date: number;
}

export type { PostType };
