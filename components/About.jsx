'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import content from '@/data/content';
import SectionTitle from './SectionTitle';

export default function About() {
    const { lang } = useLang();
    const t = content[lang].about;
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const prefersReducedMotion = useReducedMotion();

    return (
        <section
            id="about"
            className="relative py-[var(--space-section)] overflow-hidden"
            aria-labelledby="about-title"
        >
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-volt-500/5 blur-[150px]" />

            <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title={t.title} subtitle={t.subtitle} />

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Text Content */}
                    <div className="space-y-6">
                        {t.paragraphs.map((p, i) => (
                            <motion.p
                                key={i}
                                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                                className="text-base sm:text-lg text-volt-200/70 leading-relaxed"
                            >
                                {p}
                            </motion.p>
                        ))}
                    </div>

                    {/* Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {t.highlights.map((h, i) => (
                            <motion.div
                                key={i}
                                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                className="text-center p-6 rounded-2xl bg-surface-card border border-surface-border hover:border-volt-500/30 transition-colors duration-300"
                            >
                                <div className="font-display text-3xl sm:text-4xl font-bold text-gradient mb-2">
                                    {h.number}
                                </div>
                                <div className="text-sm text-volt-200/60">{h.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
