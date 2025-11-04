import { Leaf } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
      <Leaf className="h-7 w-7" />
      <span className="font-headline">EcoCrafter</span>
    </Link>
  );
}
