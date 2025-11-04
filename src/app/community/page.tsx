import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockCommunityPosts } from "@/lib/mock-data";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: 'Community Showcase',
};

export default function CommunityPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold font-headline">Community Showcase</h1>
        <p className="mt-2 text-lg text-foreground/70">See what others are creating!</p>
        <Button className="mt-4 bg-accent text-accent-foreground">Post Your Craft</Button>
      </div>
      <div className="space-y-8">
        {mockCommunityPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-3 border-b p-4">
              <Avatar>
                <AvatarImage src={post.authorImage} alt={post.author} />
                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{post.author}</p>
                <p className="text-sm text-foreground/60">{post.timestamp}</p>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="mb-4">{post.caption}</p>
              {post.postImage && (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border">
                  <Image src={post.postImage} alt="Community craft" fill className="object-cover" data-ai-hint={post.postImageHint} />
                </div>
              )}
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <button className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments} Comments</span>
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
