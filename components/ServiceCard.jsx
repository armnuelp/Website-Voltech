'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function ServiceCard({ icon, title, desc, index = 0 }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={prefersReducedMotion ? {} : { y: -6, transition: { duration: 0.25 } }}
            className="group relative p-6 sm:p-8 rounded-2xl bg-surface-card border border-surface-border hover:border-volt-500/30 transition-all duration-300 hover:shadow-card-hover"
        >
            {/* Glow on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-volt-500/5 to-spark-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="text-4xl mb-5 w-14 h-14 rounded-xl bg-volt-500/10 flex items-center justify-center group-hover:bg-volt-500/20 transition-colors duration-300">
                    {icon}
                </div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-volt-50 mb-3 group-hover:text-gradient transition-all duration-300">
                    {title}
                </h3>
                <p className="text-sm sm:text-base text-volt-200/60 leading-relaxed">
                    {desc}
                </p>
            </div>
        </motion.div>
    );
}
