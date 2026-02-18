'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function ValueCard({ icon, title, desc, index = 0 }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex gap-5 p-6 rounded-2xl hover:bg-surface-card/60 transition-all duration-300"
        >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-volt-500/20 to-spark-400/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <div>
                <h3 className="font-display text-lg font-semibold text-volt-50 mb-2">
                    {title}
                </h3>
                <p className="text-sm sm:text-base text-volt-200/60 leading-relaxed">
                    {desc}
                </p>
            </div>
        </motion.div>
    );
}
