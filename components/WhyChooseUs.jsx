'use client';

import { useLang } from '@/context/LanguageContext';
import content from '@/data/content';
import SectionTitle from './SectionTitle';
import ValueCard from './ValueCard';

export default function WhyChooseUs() {
    const { lang } = useLang();
    const t = content[lang].whyUs;

    return (
        <section
            id="why-us"
            className="relative py-[var(--space-section)]"
            aria-labelledby="why-us-title"
        >
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-volt-600/5 blur-[120px] -translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle title={t.title} subtitle={t.subtitle} />

                <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {t.items.map((item, i) => (
                        <ValueCard
                            key={i}
                            icon={item.icon}
                            title={item.title}
                            desc={item.desc}
                            index={i}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
