import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { SellCraftForm } from './SellCraftForm';

export const metadata = {
  title: 'Sell Your Craft',
};

export default function SellCraftPage() {
  const bannerImage = PlaceHolderImages.find(p => p.id === 'sell-craft-banner');

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="relative mb-12 h-64 w-full overflow-hidden rounded-lg">
        {bannerImage && (
          <>
            <Image
              src={bannerImage.imageUrl}
              alt={bannerImage.description}
              fill
              className="object-cover"
              data-ai-hint={bannerImage.imageHint}
            />
            <div className="absolute inset-0 bg-black/50" />
          </>
        )}
        <div className="relative flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold font-headline">Sell Your Masterpiece</h1>
          <p className="mt-2 max-w-2xl text-lg">
            Join our marketplace and turn your passion into profit. List your handmade, eco-friendly crafts for others to buy.
          </p>
        </div>
      </div>
      <SellCraftForm />
    </div>
  );
}
