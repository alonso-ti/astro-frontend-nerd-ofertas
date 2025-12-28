import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

interface Props {
    productTitle: string;
    category: string;
}

export default function FAQSection({ productTitle, category }: Props) {
    // Generate generic but useful SEO questions based on product data
    const faqs: FAQItem[] = [
        {
            question: `O ${productTitle} é bom? Vale a pena?`,
            answer: `Sim, o ${productTitle} é uma excelente opção na categoria de ${category}. Ele oferece ótimo desempenho e custo-benefício comparado aos concorrentes. Confira o histórico de preços acima para garantir que está pagando o menor valor.`,
        },
        {
            question: `Qual o menor preço do ${productTitle} hoje?`,
            answer: `Nerd Ofertas monitora os preços das maiores lojas do Brasil. O menor preço encontrado hoje está destacado no topo desta página. Recomendamos criar um Alerta de Preço para ser avisado sobre promoções.`,
        },
        {
            question: `Onde comprar ${productTitle} com segurança?`,
            answer: `Listamos apenas ofertas de lojas confiáveis e verificadas, como Amazon, Kabum, Mercado Livre e Magalu. Clique no botão "Ir à Loja" para ser redirecionado com segurança.`,
        },
    ];

    // Schema.org FAQPage JSON-LD
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
            },
        })),
    };

    return (
        <section className="py-8 border-t border-border mt-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Perguntas Frequentes</h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary transition-colors">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
