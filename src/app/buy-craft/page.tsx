import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCrafts } from '@/lib/mock-data';
import { ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Buy Crafts',
};

export default function BuyCraftPage() {
  return (
    <div className="container mx-auto max-w-7xl py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">Buy Hand-Made Crafts</h1>
        <p className="mt-2 text-lg text-foreground/70">Support our creators by purchasing their unique, eco-friendly creations.</p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {mockCrafts.map((craft) => (
            <Card key={craft.id} className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                <CardHeader className="p-0">
                    <Link href={`/crafts/${craft.id}`} className="block">
                        <div className="relative h-64 w-full">
                        <Image
                            src={`https://img.youtube.com/vi/${craft.youtubeId}/hqdefault.jpg`}
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
                        <Link href={`/crafts/${craft.id}`}>{craft.title}</Link>
                    </CardTitle>
                    <CardDescription className="mt-2 text-sm">{craft.material}</CardDescription>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4 p-4 pt-0">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-1 text-sm text-amber-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span>{craft.rating}</span>
                            <span className="ml-1 text-xs text-foreground/50">({craft.reviewCount})</span>
                        </div>
                        <p className="text-lg font-semibold text-primary">${craft.price?.toFixed(2)}</p>
                    </div>
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        <ShoppingCart className="mr-2 h-4 w-4"/>
                        Add to Cart
                    </Button>
                </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
