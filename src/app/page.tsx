import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Lightbulb, Recycle, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-background/50" />
        <div className="relative container mx-auto flex h-full max-w-7xl flex-col items-center justify-center text-center">
          <div className="bg-background/80 p-8 rounded-lg shadow-xl backdrop-blur-sm">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline">
              Transform Waste into Wonder
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-foreground/80 md:text-xl">
              Join a community of creators turning everyday trash into treasure. Discover, share, and get inspired with eco-friendly craft ideas.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/crafts">Explore Crafts</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/ai-generator">Get AI Ideas</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-card">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">What We Offer</h2>
            <p className="mt-4 text-lg text-foreground/70">
              Everything you need to start your sustainable crafting journey.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <CardHeader className="items-center text-center">
                <div className="rounded-full bg-primary/10 p-4 text-primary">
                  <Recycle className="h-8 w-8" />
                </div>
                <CardTitle className="mt-4">Browse Crafts</CardTitle>
                <CardDescription>
                  Explore hundreds of step-by-step tutorials to upcycle waste materials.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="link" asChild>
                  <Link href="/crafts">Find a Project &rarr;</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <CardHeader className="items-center text-center">
                <div className="rounded-full bg-primary/10 p-4 text-primary">
                  <Lightbulb className="h-8 w-8" />
                </div>
                <CardTitle className="mt-4">AI Idea Generator</CardTitle>
                <CardDescription>
                  Stuck for ideas? Let our AI suggest unique crafts based on materials you have.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="link" asChild>
                  <Link href="/ai-generator">Generate Ideas &rarr;</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <CardHeader className="items-center text-center">
                <div className="rounded-full bg-primary/10 p-4 text-primary">
                  <Users className="h-8 w-8" />
                </div>
                <CardTitle className="mt-4">Join our Community</CardTitle>
                <CardDescription>
                  Share your creations, get feedback, and connect with fellow eco-crafters.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="link" asChild>
                  <Link href="/community">See Community Posts &rarr;</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
