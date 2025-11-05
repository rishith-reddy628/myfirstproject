'use client';

import { useActionState, useState, useRef, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { chatAction, ChatFormState } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Bot, User, CornerDownLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      <CornerDownLeft className="h-4 w-4" />
      <span className="sr-only">Submit</span>
    </Button>
  );
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleAction = async (previousState: ChatFormState, formData: FormData) => {
    const query = formData.get('query') as string;
    if (!query) return { message: '', response: '' };

    setMessages((prevMessages) => [...prevMessages, { role: 'user', content: query }]);
    const newState = await chatAction(previousState, formData);

    if (newState.response) {
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: newState.response! }]);
    }
    formRef.current?.reset();
    return newState;
  };

  const initialState: ChatFormState = { message: '', response: '' };
  const [state, formAction] = useActionState(handleAction, initialState);

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }
  }, [messages]);


  return (
    <Card className="mt-16 w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot />
          Waste Management AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 w-full pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Ask me anything about waste management!</p>
                </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 text-sm ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <Bot className="h-5 w-5" />
                  </div>
                )}
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p>{message.content}</p>
                </div>
                 {message.role === 'user' && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
                    <User className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form ref={formRef} action={formAction} className="flex w-full items-center space-x-2">
          <Input id="query" name="query" placeholder="e.g., How can I recycle old electronics?" />
          <SubmitButton />
        </form>
      </CardFooter>
    </Card>
  );
}
