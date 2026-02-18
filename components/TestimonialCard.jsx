'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function TestimonialCard({ quote, name, role, index = 0 }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group p-6 sm:p-8 rounded-2xl bg-surface-card border border-surface-border hover:border-volt-500/30 transition-all duration-300 flex flex-col"
        >
            {/* Quote mark */}
            <div className="text-4xl text-volt-500/30 font-serif leading-none mb-4">&ldquo;</div>

            <blockquote className="flex-1 text-base sm:text-lg text-volt-200/80 leading-relaxed mb-6 italic">
                {quote}
            </blockquote>

            <div className="flex items-center gap-4 pt-4 border-t border-surface-border">
                {/* Avatar placeholder */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-volt-500 to-spark-400 flex items-center justify-center text-surface-dark font-display font-bold text-sm">
                    {name.charAt(0)}
                </div>
                <div>
                    <div className="font-semibold text-volt-50 text-sm">{name}</div>
                    <div className="text-xs text-volt-200/50">{role}</div>
                </div>
            </div>
        </motion.div>
    );
}
