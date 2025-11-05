import type { Craft, CommunityPost } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const mockCrafts: Craft[] = [
  {
    id: '1',
    title: 'DIY Plastic Bottle Planters',
    material: 'Plastic',
    youtubeId: 'j65i5n33N4I', // A random relevant video ID
    description: 'A simple and fun way to turn plastic waste into beautiful planters for your home or garden. This project is great for all ages and requires minimal tools.',
    rating: 4.5,
    reviewCount: 120,
    price: 12.99,
  },
  {
    id: '2',
    title: 'No-Sew T-Shirt Tote Bag',
    material: 'Fabric',
    youtubeId: 't4_2m_aJ3-s',
    description: 'Transform an old t-shirt into a stylish and durable tote bag without any sewing! Perfect for groceries, books, or as a unique fashion accessory.',
    rating: 4.8,
    reviewCount: 250,
    price: 19.99,
  },
  {
    id: '3',
    title: 'Cardboard Roll Wall Art',
    material: 'Paper',
    youtubeId: 'S-22uS_dRIk',
    description: 'Create stunning, intricate wall art using nothing more than toilet paper or paper towel rolls. A cheap and chic way to decorate your space.',
    rating: 4.2,
    reviewCount: 85,
    price: 24.50,
  },
  {
    id: '4',
    title: 'Glass Jar Lanterns',
    material: 'Glass',
    youtubeId: 'XpC6pS8g55U',
    description: 'Light up your evenings with beautiful lanterns made from old glass jars. Customize them with paint, twine, or other decorations for a magical ambiance.',
    rating: 4.6,
    reviewCount: 150,
    price: 15.00,
  },
  {
    id: '5',
    title: 'Origami Paper Cranes',
    material: 'Paper',
    youtubeId: 'Kfny19sR9VA',
    description: 'Learn the ancient art of paper folding by creating beautiful origami cranes. A relaxing craft that can be used for decoration or as a symbol of peace.',
    rating: 4.7,
    reviewCount: 180,
    price: 9.99,
  },
  {
    id: '6',
    title: 'Plastic Bottle Bird Feeder',
    material: 'Plastic',
    youtubeId: '5n5O-2L34qg',
    description: 'Make a simple and effective bird feeder from a recycled plastic bottle. A great way to attract birds to your garden and help them through the seasons.',
    rating: 4.4,
    reviewCount: 95,
    price: 11.50,
  },
];

export const mockCommunityPosts: CommunityPost[] = [
    {
      id: 'p1',
      author: 'Jane Doe',
      authorImage: 'https://i.pravatar.cc/150?u=jane',
      postImage: PlaceHolderImages.find(p => p.id === 'community-post-1')?.imageUrl || '',
      postImageHint: PlaceHolderImages.find(p => p.id === 'community-post-1')?.imageHint || '',
      caption: "Made this bird feeder from a milk carton! The birds are loving it this morning. 🐦",
      comments: 12,
      timestamp: '2h ago'
    },
    {
      id: 'p2',
      author: 'John Smith',
      authorImage: 'https://i.pravatar.cc/150?u=john',
      postImage: PlaceHolderImages.find(p => p.id === 'community-post-2')?.imageUrl || '',
      postImageHint: PlaceHolderImages.find(p => p.id === 'community-post-2')?.imageHint || '',
      caption: "My first attempt at a mosaic picture frame from some old tiles I had. So happy with how it turned out!",
      comments: 28,
      timestamp: '1d ago'
    }
]
