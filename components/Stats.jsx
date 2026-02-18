'use client';

import { useLang } from '@/context/LanguageContext';
import content from '@/data/content';
import SectionTitle from './SectionTitle';
import StatsCounter from './StatsCounter';

export default function Stats() {
    const { lang } = useLang();
    const t = content[lang].stats;

    return (
        <section
            id="stats"
            className="relative py-[var(--space-section)] bg-surface-card/30"
            aria-labelledby="stats-title"
        >
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-volt-500/5 blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle title={t.title} subtitle={t.subtitle} />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
                    {t.items.map((item, i) => (
                        <div
                            key={i}
                            className="p-4 sm:p-6 rounded-2xl bg-surface-card border border-surface-border"
                        >
                            <StatsCounter
                                value={item.value}
                                suffix={item.suffix}
                                label={item.label}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
