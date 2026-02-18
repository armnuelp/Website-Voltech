'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/context/LanguageContext';
import content from '@/data/content';

export default function FinalCTA() {
    const { lang } = useLang();
    const t = content[lang].finalCta;
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const prefersReducedMotion = useReducedMotion();

    return (
        <section
            id="contact"
            className="relative py-[var(--space-section)] overflow-hidden"
            aria-labelledby="cta-title"
        >
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-volt-600/20 via-surface-dark to-spark-400/10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-volt-500/10 blur-[150px]" />
            </div>

            <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.h2
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-volt-50 mb-6"
                >
                    {t.title}
                </motion.h2>

                <motion.p
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-base sm:text-lg text-volt-200/70 mb-10 max-w-2xl mx-auto"
                >
                    {t.desc}
                </motion.p>

                <motion.div
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href={t.ctaLink}
                        className="group relative px-8 py-4 text-base font-semibold rounded-full bg-gradient-to-r from-spark-400 to-spark-500 text-surface-dark hover:from-spark-300 hover:to-spark-400 transition-all duration-300 shadow-glow-spark hover:scale-105"
                    >
                        {t.cta}
                    </a>
                    <a
                        href="#portfolio"
                        className="px-8 py-4 text-base font-semibold rounded-full border border-surface-border text-volt-200 hover:text-volt-50 hover:border-volt-500/40 hover:bg-white/5 transition-all duration-300"
                    >
                        {t.ctaSecondary}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
