'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCrafts } from '@/lib/mock-data';
import { Star, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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

export default function CraftsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('All');

  const filteredCrafts = useMemo(() => {
    return mockCrafts.filter((craft) => {
      const matchesSearch =
        craft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        craft.material.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesMaterial =
        selectedMaterial === 'All' || craft.material.toLowerCase().includes(selectedMaterial.toLowerCase());

      return matchesSearch && matchesMaterial;
    });
  }, [searchTerm, selectedMaterial]);

  return (
    <div className="container mx-auto max-w-7xl py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold font-headline">Craft Library</h1>
        <p className="mt-2 text-lg text-foreground/70">Find your next sustainable project.</p>
      </div>

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
      
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCrafts.length > 0 ? (
          filteredCrafts.map((craft) => (
            <Link key={craft.id} href={`/crafts/${craft.id}`} className="group">
              <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <Image
                      src={getMockImage(craft.id)}
                      alt={craft.title}
                      fill
                      className="object-cover"
                      data-ai-hint={craft.material}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg font-bold group-hover:text-primary">{craft.title}</CardTitle>
                  <CardDescription className="mt-2 text-sm">{craft.material}</CardDescription>
                </CardContent>
                <CardFooter className="flex items-center justify-between p-4 pt-0">
                  <div className="flex items-center gap-1 text-sm text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{craft.rating}</span>
                    <span className="ml-1 text-foreground/50">({craft.reviewCount})</span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <h2 className="text-2xl font-semibold">No Crafts Found</h2>
            <p className="mt-2 text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
