'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export default function StatsCounter({ value, suffix = '', label }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });
    const prefersReducedMotion = useReducedMotion();
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        if (prefersReducedMotion) {
            setCount(value);
            return;
        }

        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        const interval = duration / steps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, interval);

        return () => clearInterval(timer);
    }, [isInView, value, prefersReducedMotion]);

    return (
        <motion.div
            ref={ref}
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center p-6"
        >
            <div className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-2">
                {count}
                <span className="text-spark-400">{suffix}</span>
            </div>
            <div className="text-sm sm:text-base text-volt-200/60">{label}</div>
        </motion.div>
    );
}
