import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <Logo />
        <p className="text-sm text-foreground/60">
          © {new Date().getFullYear()} EcoCrafter. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
