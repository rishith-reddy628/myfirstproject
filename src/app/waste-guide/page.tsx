import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Chatbot } from "./Chatbot";

export const metadata = {
  title: 'Waste Segregation Guide',
};

const wasteArticles = [
    {
        id: 'why-segregate',
        title: 'Why is Waste Segregation Important?',
        content: 'Waste segregation is the process of separating different types of waste at the source. It is crucial because it facilitates recycling, reduces the amount of waste sent to landfills, and minimizes environmental pollution. Proper segregation ensures that recyclable materials are recovered and repurposed, conserving natural resources and energy.'
    },
    {
        id: 'composting-101',
        title: 'Composting 101: A Beginner\'s Guide',
        content: 'Composting is a natural process of recycling organic waste—such as food scraps and yard trimmings—into a valuable fertilizer. To start, you need a mix of "greens" (nitrogen-rich materials like vegetable peels) and "browns" (carbon-rich materials like dry leaves). A good balance, moisture, and aeration will turn your waste into nutrient-rich compost for your garden.'
    }
]

export default function WasteGuidePage() {
  const dryWasteImage = PlaceHolderImages.find(p => p.id === 'waste-guide-dry');
  const wetWasteImage = PlaceHolderImages.find(p => p.id === 'waste-guide-wet');

  return (
    <div className="container mx-auto max-w-5xl py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold font-headline">Waste Management Guide</h1>
        <p className="mt-2 text-lg text-foreground/70">Learn how to properly segregate and manage your waste to help the environment.</p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <Card>
          <CardHeader className="p-0">
            {dryWasteImage &&
              <div className="relative h-56 w-full">
                <Image src={dryWasteImage.imageUrl} alt="Dry waste" fill className="rounded-t-lg object-cover" data-ai-hint={dryWasteImage.imageHint} />
              </div>
            }
            <div className="p-6">
              <CardTitle className="text-2xl text-primary">Dry Waste</CardTitle>
              <CardDescription>Materials like paper, plastic, glass, and metal.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <p className="mb-4">Watch this video to learn how to properly sort your dry recyclables.</p>
            <div className="aspect-video w-full overflow-hidden rounded-lg border">
                <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/FORrE5dB2gc"
                    title="Dry Waste Segregation"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-0">
            {wetWasteImage &&
              <div className="relative h-56 w-full">
                <Image src={wetWasteImage.imageUrl} alt="Wet waste" fill className="rounded-t-lg object-cover" data-ai-hint={wetWasteImage.imageHint} />
              </div>
            }
             <div className="p-6">
              <CardTitle className="text-2xl text-primary">Wet Waste</CardTitle>
              <CardDescription>Organic materials like food scraps and yard trimmings.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <p className="mb-4">Discover the basics of composting your wet waste at home.</p>
            <div className="aspect-video w-full overflow-hidden rounded-lg border">
                <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/zy70DAaeFBI"
                    title="Wet Waste Composting"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16">
        <h2 className="mb-8 text-center text-3xl font-bold font-headline">Educational Articles</h2>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {wasteArticles.map(article => (
                <AccordionItem key={article.id} value={article.id}>
                    <AccordionTrigger className="text-lg">{article.title}</AccordionTrigger>
                    <AccordionContent className="text-base text-foreground/80 leading-relaxed">
                        {article.content}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>

      <Chatbot />
    </div>
  );
}
