'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { SellCraftForm } from './SellCraftForm';
import { Skeleton } from '@/components/ui/skeleton';

// Note: Metadata is now defined in a client component, which is not ideal for SEO.
// This is a workaround for the hydration issue. In a real app, you might handle this differently.
// export const metadata = {
//   title: 'Sell Your Craft',
// };

function SellCraftClient() {
    const bannerImage = PlaceHolderImages.find(p => p.id === 'sell-craft-banner');

    return (
        <>
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
        </>
    );
}


export default function SellCraftPage() {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="container mx-auto max-w-4xl py-12">
      {isClient ? <SellCraftClient /> : (
        <div className="space-y-12">
            <Skeleton className="h-64 w-full" />
            <div className="space-y-6 rounded-lg border p-6">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-6 w-2/3" />
                <div className="space-y-6 pt-6">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
                 <Skeleton className="h-11 w-full" />
            </div>
        </div>
      )}
    </div>
  );
}