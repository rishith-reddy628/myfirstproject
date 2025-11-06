'use client';

import Link from 'next/link';
import { Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from './Logo';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { CartSheet } from './CartSheet';

const navLinks = [
  { href: '/crafts', label: 'Browse Crafts' },
  { href: '/ai-generator', label: 'AI Ideas' },
  { href: '/waste-guide', label: 'Waste Guide' },
  { href: '/community', label: 'Community' },
  { href: '/buy-craft', label: 'Buy Craft' },
  { href: '/sell-craft', label: 'Sell Craft' },
];

export function Header() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: 'Logged out successfully',
      });
      router.push('/');
    } catch (error) {
      toast({
        title: 'Logout Failed',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {isUserLoading ? (
             <div className="h-10 w-24 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
          <CartSheet />
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col p-6">
                <div className="mb-8">
                  <Logo />
                </div>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-8 flex flex-col gap-2">
                   {isUserLoading ? (
                      <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
                   ) : user ? (
                     <Button variant="ghost" onClick={handleLogout}>
                       <LogOut className="mr-2 h-4 w-4" />
                       Log Out
                     </Button>
                   ) : (
                     <>
                        <Button variant="ghost" asChild>
                          <Link href="/login">Log in</Link>
                        </Button>
                        <Button className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                          <Link href="/signup">Sign Up</Link>
                        </Button>
                     </>
                   )}
                   <CartSheet />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
