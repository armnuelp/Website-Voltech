'use client';

import { useLang } from '@/context/LanguageContext';
import content from '@/data/content';
import SectionTitle from './SectionTitle';
import TestimonialCard from './TestimonialCard';

export default function Testimonials() {
    const { lang } = useLang();
    const t = content[lang].testimonials;

    return (
        <section
            id="testimonials"
            className="relative py-[var(--space-section)]"
            aria-labelledby="testimonials-title"
        >
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-spark-400/5 blur-[120px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle title={t.title} subtitle={t.subtitle} />

                <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
                    {t.items.map((item, i) => (
                        <TestimonialCard
                            key={i}
                            quote={item.quote}
                            name={item.name}
                            role={item.role}
                            index={i}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
