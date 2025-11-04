import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCrafts } from '@/lib/mock-data';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Browse Crafts',
};

export default function CraftsPage() {
  return (
    <div className="container mx-auto max-w-7xl py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">Craft Library</h1>
        <p className="mt-2 text-lg text-foreground/70">Find your next sustainable project.</p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {mockCrafts.map((craft) => (
            <Link key={craft.id} href={`/crafts/${craft.id}`} className="group">
              <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <Image
                      src={`https://img.youtube.com/vi/${craft.youtubeId}/hqdefault.jpg`}
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
          ))}
      </div>
    </div>
  );
}
