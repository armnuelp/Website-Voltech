'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import content from '@/data/content';

export default function Hero() {
    const { lang } = useLang();
    const t = content[lang].hero;
    const ref = useRef(null);
    const prefersReducedMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <section
            ref={ref}
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            aria-label="Hero"
        >
            {/* Parallax Background */}
            <motion.div
                className="absolute inset-0 z-0"
                style={prefersReducedMotion ? {} : { y: bgY }}
            >
                {/* Gradient Orbs */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-volt-600/20 blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-spark-400/10 blur-[100px] animate-pulse-slow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-volt-500/5 blur-[150px]" />

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(22,163,74,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(22,163,74,0.3) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }}
                />
            </motion.div>

            {/* Content */}
            <motion.div
                style={prefersReducedMotion ? {} : { opacity, scale }}
                className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants} className="mb-8">
                        <span className="inline-flex items-center px-5 py-2 rounded-full text-sm font-medium bg-volt-500/10 border border-volt-500/20 text-volt-300 backdrop-blur-sm">
                            {t.badge}
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={itemVariants}
                        className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 flex flex-col items-center justify-center gap-1 sm:gap-2"
                    >
                        <span className="block">{t.headline}</span>
                        <span className="block text-gradient py-1">{t.headlineHighlight}</span>
                        <span className="block">{t.headlineSuffix}</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={itemVariants}
                        className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-volt-200/70 leading-relaxed mb-10"
                    >
                        {t.sub}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <a
                            href="#contact"
                            className="group relative px-8 py-4 text-base font-semibold rounded-full bg-gradient-to-r from-volt-500 to-volt-600 text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
                        >
                            <span className="relative z-10">{t.cta1}</span>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-volt-400 to-spark-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative z-10" />
                        </a>
                        <a
                            href="#portfolio"
                            className="px-8 py-4 text-base font-semibold rounded-full border border-surface-border text-volt-200 hover:text-volt-50 hover:border-volt-500/40 hover:bg-white/5 transition-all duration-300"
                        >
                            {t.cta2}
                        </a>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-dark to-transparent z-10" />

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-6 h-10 rounded-full border-2 border-volt-500/30 flex items-start justify-center p-1.5"
                >
                    <div className="w-1.5 h-3 rounded-full bg-volt-400" />
                </motion.div>
            </motion.div>
        </section>
    );
}
