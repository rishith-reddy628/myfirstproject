'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateIdeasAction, FormState } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';

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
  const [state, formAction] = useFormState(generateIdeasAction, initialState);
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
    if (state.message === 'Ideas generated successfully!') {
        formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction}>
      <Card>
        <CardHeader>
          <CardTitle>AI Craft Idea Generator</CardTitle>
          <CardDescription>
            Enter a type of waste material you have, and let our AI inspire you with creative craft ideas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
            {state.craftIdeas && (
              <div className="space-y-2">
                <Label>Generated Ideas</Label>
                <Textarea
                    readOnly
                    value={state.craftIdeas}
                    className="min-h-[200px] bg-muted/50"
                    rows={10}
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}
