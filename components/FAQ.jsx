'use client';

import { useLang } from '@/context/LanguageContext';
import content from '@/data/content';
import SectionTitle from './SectionTitle';
import FAQItem from './FAQItem';

export default function FAQ() {
    const { lang } = useLang();
    const t = content[lang].faq;

    return (
        <section
            id="faq"
            className="relative py-[var(--space-section)] bg-surface-card/30"
            aria-labelledby="faq-title"
        >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title={t.title} subtitle={t.subtitle} />

                <div className="bg-surface-card rounded-2xl border border-surface-border p-2 sm:p-4">
                    {t.items.map((item, i) => (
                        <FAQItem
                            key={i}
                            question={item.q}
                            answer={item.a}
                            index={i}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
