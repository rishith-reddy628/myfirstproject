export interface Craft {
  id: string;
  title: string;
  material: string;
  youtubeId: string;
  description: string;
  rating: number;
  reviewCount: number;
  price?: number;
}

export interface CommunityPost {
  id:string;
  author: string;
  authorImage: string;
  postImage: string;
  postImageHint: string;
  caption: string;
  comments: number;
  timestamp: string;
  material: string;
}

export interface MarketplaceListing {
  id: string;
  name: string;
  price: number;
  imageURL: string;
  description: string;
  material: string;
  sellerId?: string;
}
