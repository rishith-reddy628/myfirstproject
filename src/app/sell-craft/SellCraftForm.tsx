'use client';

import { useActionState, useRef, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { sellCraftAction, FormState } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Upload, DollarSign } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? 'Listing your craft...' : 'List My Craft for Sale'}
    </Button>
  );
}

export function SellCraftForm() {
  const initialState: FormState = { message: '' };
  const [state, formAction] = useActionState(sellCraftAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!state.message) return;

    if (state.message === 'Craft listed successfully!') {
      toast({
        title: 'Success!',
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.issues || state.message) {
      toast({
        title: 'Error Listing Craft',
        description: state.message || 'Please check the form for errors.',
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction}>
      <Card>
        <CardHeader>
          <CardTitle>Craft Details</CardTitle>
          <CardDescription>
            Fill out the form below to list your item on the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Craft Title</Label>
            <Input id="title" name="title" placeholder="e.g., Hand-Knit Scarf" required />
            {state.issues?.title && <p className="text-sm text-destructive">{state.issues.title}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="Describe your beautiful craft..." required rows={5} />
            {state.issues?.description && <p className="text-sm text-destructive">{state.issues.description}</p>}
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
             <div className="space-y-2">
                <Label htmlFor="material">Main Material</Label>
                <Input id="material" name="material" placeholder="e.g., Recycled Wool" required />
                {state.issues?.material && <p className="text-sm text-destructive">{state.issues.material}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="price" name="price" type="number" placeholder="25.00" required className="pl-8" step="0.01" />
                </div>
                {state.issues?.price && <p className="text-sm text-destructive">{state.issues.price}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="photo">Craft Photo</Label>
            <div className="flex items-center gap-4">
                <Input id="photo" name="photo" type="file" required accept="image/*" className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
            </div>
            {state.issues?.photo && <p className="text-sm text-destructive">{state.issues.photo}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}
