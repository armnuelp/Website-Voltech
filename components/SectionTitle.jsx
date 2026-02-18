'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

export default function SectionTitle({ title, subtitle, light = false }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const prefersReducedMotion = useReducedMotion();

    return (
        <div ref={ref} className="text-center mb-12 md:mb-16">
            <motion.h2
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 ${light ? 'text-volt-50' : 'text-volt-50'
                    }`}
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-base sm:text-lg text-volt-200/60 max-w-2xl mx-auto"
                >
                    {subtitle}
                </motion.p>
            )}
            <motion.div
                initial={prefersReducedMotion ? {} : { scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-volt-500 to-spark-400 origin-center"
            />
        </div>
    );
}
