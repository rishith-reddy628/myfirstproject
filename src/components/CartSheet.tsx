'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';

export function CartSheet() {
  const { cart, removeFromCart, total, clearCart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Open Cart</span>
          {cart.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-1 text-xs"
            >
              {cart.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart ({cart.length})</SheetTitle>
          <SheetDescription>
            Items you have added to your cart.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1">
          {cart.length > 0 ? (
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.imageURL || ''}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-primary">
                        ${item.price?.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
              <p className="mt-4 font-semibold">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">
                Add some crafts to get started!
              </p>
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <SheetFooter className="space-y-4">
            <div className="flex w-full items-center justify-between font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button className="w-full">Checkout</Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => clearCart()}
            >
              Clear Cart
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
