'use client';

import { useLang } from '@/context/LanguageContext';
import content from '@/data/content';
import SectionTitle from './SectionTitle';
import ServiceCard from './ServiceCard';

export default function Services() {
    const { lang } = useLang();
    const t = content[lang].services;

    return (
        <section
            id="services"
            className="relative py-[var(--space-section)] bg-surface-card/30"
            aria-labelledby="services-title"
        >
            {/* Background accent */}
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-spark-400/5 blur-[150px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle title={t.title} subtitle={t.subtitle} />

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {t.items.map((item, i) => (
                        <ServiceCard
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
