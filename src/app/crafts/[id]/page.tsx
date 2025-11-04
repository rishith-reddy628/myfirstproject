import { mockCrafts } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';


export async function generateMetadata({ params }: { params: { id: string } }) {
    const craft = mockCrafts.find((p) => p.id === params.id);
    if (!craft) {
        return { title: 'Craft Not Found' };
    }
    return { title: craft.title };
}

export default function CraftDetailPage({ params }: { params: { id: string } }) {
  const craft = mockCrafts.find((p) => p.id === params.id);

  if (!craft) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="space-y-8">
        <div>
          <Badge variant="secondary" className="mb-2">{craft.material}</Badge>
          <h1 className="text-4xl font-bold font-headline">{craft.title}</h1>
          <div className="mt-2 flex items-center gap-2 text-lg text-amber-500">
            <Star className="h-5 w-5 fill-current" />
            <span>{craft.rating}</span>
            <span className="text-base text-foreground/60">({craft.reviewCount} reviews)</span>
          </div>
        </div>

        <div className="aspect-video w-full overflow-hidden rounded-lg border">
            <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${craft.youtubeId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-foreground/80 leading-relaxed">{craft.description}</p>
            </CardContent>
        </Card>

        {/* Placeholder for Ratings and Reviews */}
        <Card>
            <CardHeader>
                <CardTitle>Ratings & Reviews</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-foreground/60">Reviews are coming soon!</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
