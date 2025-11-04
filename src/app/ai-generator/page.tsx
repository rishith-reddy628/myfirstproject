import { IdeaForm } from './IdeaForm';

export const metadata = {
  title: 'AI Craft Idea Generator',
};

export default function AIGeneratorPage() {
  return (
    <div className="container mx-auto max-w-2xl py-12">
      <IdeaForm />
    </div>
  );
}
