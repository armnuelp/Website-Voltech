'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import content from '@/data/content';

export default function Navbar() {
    const { lang, toggleLang } = useLang();
    const t = content[lang].nav;
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-surface-dark/90 backdrop-blur-xl border-b border-surface-border shadow-lg'
                : 'bg-transparent'
                }`}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="w-full px-4 sm:px-6 lg:px-12">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <a
                        href="#"
                        className="flex items-center gap-2 group"
                        aria-label="Voltech.h - Home"
                    >
                        <img
                            src="/assets/icon/IMG_8248.PNG"
                            alt="Voltech Logo"
                            className="w-9 h-9 rounded-lg object-contain transition-transform group-hover:scale-110"
                        />
                        <span className="font-display font-bold text-lg text-volt-50 tracking-tight">
                            {t.logo}
                        </span>
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-1">
                        {t.links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 text-sm text-volt-200/80 hover:text-volt-50 transition-colors duration-200 rounded-lg hover:bg-white/5"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        {/* Language Toggle */}
                        <button
                            onClick={toggleLang}
                            className="px-3 py-1.5 text-xs font-semibold border border-surface-border rounded-full text-volt-200 hover:text-volt-50 hover:border-volt-500/40 transition-all duration-200 uppercase tracking-wider"
                            aria-label={`Switch language to ${lang === 'id' ? 'English' : 'Bahasa Indonesia'}`}
                        >
                            {lang === 'id' ? 'EN' : 'ID'}
                        </button>

                        {/* CTA */}
                        <a
                            href="#contact"
                            className="hidden sm:inline-flex px-5 py-2.5 text-sm font-semibold rounded-full bg-gradient-to-r from-volt-500 to-volt-600 text-white hover:from-volt-400 hover:to-volt-500 transition-all duration-300 shadow-glow hover:shadow-glow-lg"
                        >
                            {t.cta}
                        </a>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden p-2 text-volt-200 hover:text-volt-50 transition-colors"
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileOpen}
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:hidden bg-surface-dark/95 backdrop-blur-xl border-t border-surface-border overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-1">
                            {t.links.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        // 1. Close menu state
                                        setMobileOpen(false);
                                        // 2. Unlock body scroll immediately
                                        document.body.style.overflow = '';

                                        const targetId = link.href.replace('#', '');
                                        const element = document.getElementById(targetId);

                                        if (element) {
                                            // 3. Scroll after a tiny delay to ensure layout effect has processed if needed
                                            setTimeout(() => {
                                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                // Optional: correct the URL hash without jumping
                                                window.history.pushState(null, '', link.href);
                                            }, 100);
                                        }
                                    }}
                                    className="block px-4 py-3 text-base text-volt-200 hover:text-volt-50 hover:bg-white/5 rounded-xl transition-colors"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <div className="pt-4">
                                <a
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setMobileOpen(false);
                                        document.body.style.overflow = '';

                                        const element = document.getElementById('contact');
                                        if (element) {
                                            setTimeout(() => {
                                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                window.history.pushState(null, '', '#contact');
                                            }, 100);
                                        }
                                    }}
                                    className="block text-center px-5 py-3 text-sm font-semibold rounded-full bg-gradient-to-r from-volt-500 to-volt-600 text-white"
                                >
                                    {t.cta}
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
