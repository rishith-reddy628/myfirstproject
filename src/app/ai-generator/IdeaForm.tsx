'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { generateIdeasAction, FormState } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Youtube } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? 'Generating...' : <><Sparkles className="mr-2 h-4 w-4" /> Generate Ideas</>}
    </Button>
  );
}

export function IdeaForm() {
  const initialState: FormState = { message: '' };
  const [state, formAction] = useActionState(generateIdeasAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.message !== 'Ideas generated successfully!') {
        toast({
            title: 'Error',
            description: state.message,
            variant: 'destructive',
        });
    }
  }, [state.message, toast]);

  return (
    <>
      <form ref={formRef} action={formAction}>
        <Card>
          <CardHeader>
            <CardTitle>AI Craft Idea Generator</CardTitle>
            <CardDescription>
              Enter a type of waste material you have, and let our AI inspire you with creative craft ideas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="wasteMaterial">Waste Material</Label>
              <Input
                id="wasteMaterial"
                name="wasteMaterial"
                placeholder="e.g., plastic bottles, old jeans, newspapers"
                required
              />
              {state.issues && <p className="text-sm text-destructive">{state.issues.join(', ')}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>

      {state.craftIdeas && state.craftIdeas.length > 0 && (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Generated Ideas</h2>
            <div className="grid gap-6">
                {state.craftIdeas.map((idea, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{idea.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{idea.description}</p>
                        </CardContent>
                        <CardFooter>
                             <Button asChild variant="outline">
                                <Link href={`https://www.youtube.com/results?search_query=${encodeURIComponent(idea.youtubeSearchQuery)}`} target="_blank" rel="noopener noreferrer">
                                    <Youtube className="mr-2" />
                                    Find on YouTube
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
      )}
    </>
  );
}
