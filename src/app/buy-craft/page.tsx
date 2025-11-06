'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Star, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider, useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import type { MarketplaceListing } from '@/lib/types';
import { mockCrafts } from '@/lib/mock-data';
import { collection, query } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const materials = ['All', 'Plastic', 'Paper', 'Fabric', 'Glass'];

function getMockImage(craftId: string): string {
    const imageIdMap: Record<string, string> = {
        '1': 'buy-craft-plastic-planter',
        '2': 'buy-craft-tshirt-bag',
        '3': 'buy-craft-cardboard-art',
        '4': 'buy-craft-jar-lanterns',
        '5': 'buy-craft-paper-cranes',
        '6': 'buy-craft-bird-feeder',
    };
    const image = PlaceHolderImages.find(p => p.id === imageIdMap[craftId]);
    return image?.imageUrl || 'https://picsum.photos/seed/placeholder/600/400';
}


function BuyCraftClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  
  const { firestore } = useFirebase();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const listingsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'marketplace_listings'));
  }, [firestore]);

  const { data: listings, isLoading } = useCollection<MarketplaceListing>(listingsQuery);

  const allCrafts = useMemo(() => {
    const firestoreCrafts = listings ? listings.map(l => ({
        id: l.id,
        title: l.name,
        material: l.material,
        description: l.description,
        price: l.price,
        imageURL: l.imageURL,
        rating: 0,
        reviewCount: 0,
        isFromFirestore: true
    })) : [];

    const mockCraftsAsListings = mockCrafts.map(c => ({
        id: c.id,
        title: c.title,
        material: c.material,
        description: c.description,
        price: c.price,
        imageURL: getMockImage(c.id),
        rating: c.rating,
        reviewCount: c.reviewCount,
        youtubeId: c.youtubeId,
        isFromFirestore: false
    }));

    return [...firestoreCrafts, ...mockCraftsAsListings];
  }, [listings]);


  const filteredCrafts = useMemo(() => {
    return allCrafts.filter((craft) => {
      if (!craft.title || !craft.material) return false;
      const matchesSearch =
        craft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        craft.material.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesMaterial =
        selectedMaterial === 'All' || craft.material.toLowerCase().includes(selectedMaterial.toLowerCase());

      return matchesSearch && matchesMaterial;
    });
  }, [allCrafts, searchTerm, selectedMaterial]);

  const handleAddToCart = (craft: (typeof filteredCrafts)[0]) => {
    if (!craft.price) return;
    addToCart({
        id: craft.id,
        title: craft.title,
        price: craft.price,
        imageURL: craft.imageURL,
        quantity: 1,
    });
    toast({
        title: "Added to cart!",
        description: `${craft.title} has been added to your cart.`,
    });
  };

  return (
    <>
      <div className="mb-8 flex flex-col gap-6 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for crafts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full bg-muted/50 pl-10 h-12 text-lg"
          />
        </div>
        <div className="flex items-center justify-center gap-2 flex-wrap">
            {materials.map((material) => (
                <Button
                    key={material}
                    variant={selectedMaterial === material ? 'default' : 'outline'}
                    onClick={() => setSelectedMaterial(material)}
                    className={cn(
                        "rounded-full transition-colors",
                        selectedMaterial === material && "bg-primary text-primary-foreground"
                    )}
                >
                    {material}
                </Button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading && Array.from({ length: 8 }).map((_, i) => (
           <Card key={i}>
                <CardHeader className="p-0">
                    <Skeleton className="h-64 w-full" />
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/4" />
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4 p-4 pt-0">
                    <div className="flex items-center justify-between w-full">
                       <Skeleton className="h-5 w-16" />
                       <Skeleton className="h-7 w-20" />
                    </div>
                     <Skeleton className="h-10 w-full" />
                </CardFooter>
            </Card>
        ))}
        {!isLoading && filteredCrafts.length > 0 ? (
          filteredCrafts.map((craft) => (
            <Card key={craft.id} className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                <CardHeader className="p-0">
                    <Link href={craft.isFromFirestore ? `/buy-craft/${craft.id}`: `/crafts/${craft.id}`} className="block">
                        <div className="relative h-64 w-full">
                        <Image
                            src={craft.imageURL || ''}
                            alt={craft.title}
                            fill
                            className="object-cover"
                            data-ai-hint={craft.material}
                        />
                        </div>
                    </Link>
                </CardHeader>
                <CardContent className="p-4">
                    <CardTitle className="text-lg font-bold group-hover:text-primary">
                        <Link href={craft.isFromFirestore ? `/buy-craft/${craft.id}`: `/crafts/${craft.id}`}>
                           {craft.title}
                        </Link>
                    </CardTitle>
                    <CardDescription className="mt-2 text-sm">{craft.material}</CardDescription>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4 p-4 pt-0">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-1 text-sm text-amber-500">
                           {craft.rating > 0 && (
                            <>
                                <Star className="h-4 w-4 fill-current" />
                                <span>{craft.rating}</span>
                                <span className="ml-1 text-foreground/50">({craft.reviewCount})</span>
                            </>
                           )}
                        </div>
                        {craft.price && <p className="text-lg font-semibold text-primary">${craft.price?.toFixed(2)}</p>}
                    </div>
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => handleAddToCart(craft)}>
                        <ShoppingCart className="mr-2 h-4 w-4"/>
                        Add to Cart
                    </Button>
                </CardFooter>
            </Card>
          ))
        ) : (
          !isLoading && <div className="col-span-full text-center py-16">
            <h2 className="text-2xl font-semibold">No Crafts Found</h2>
            <p className="mt-2 text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default function BuyCraftPage() {
    return (
        <FirebaseClientProvider>
            <div className="container mx-auto max-w-7xl py-12">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold font-headline">Buy Hand-Made Crafts</h1>
                    <p className="mt-2 text-lg text-foreground/70">Support our creators by purchasing their unique, eco-friendly creations.</p>
                </div>
                <BuyCraftClient />
            </div>
        </FirebaseClientProvider>
    );
}
