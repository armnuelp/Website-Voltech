'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import content from '@/data/content';
import { FaGithub, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
    const { lang } = useLang();
    const t = content[lang].footer;
    const prefersReducedMotion = useReducedMotion();

    const socialIcons = {
        TikTok: <FaTiktok className="w-5 h-5" />,
        WhatsApp: <FaWhatsapp className="w-5 h-5" />,
        Instagram: <FaInstagram className="w-5 h-5" />,
        GitHub: <FaGithub className="w-5 h-5" />,
    };

    return (
        <footer
            className="relative pt-16 pb-8 border-t border-surface-border"
            role="contentinfo"
        >
            <div className="w-full px-4 sm:px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <img
                                src="/assets/icon/IMG_8248.PNG"
                                alt="Voltech Logo"
                                className="w-9 h-9 rounded-lg object-contain"
                            />
                            <span className="font-display font-bold text-lg text-volt-50">
                                {t.brand}
                            </span>
                        </div>
                        <p className="text-sm text-volt-200/60 max-w-xs mb-6">
                            {t.tagline}
                        </p>
                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            {t.socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center text-volt-200/60 hover:text-volt-50 hover:bg-volt-500/20 transition-all duration-200"
                                    aria-label={social.name}
                                >
                                    {socialIcons[social.name] || social.name.charAt(0)}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {t.columns.map((col, i) => (
                        <div key={i}>
                            <h4 className="font-display font-semibold text-volt-50 mb-4 text-sm uppercase tracking-wider">
                                {col.title}
                            </h4>
                            <ul className="space-y-3">
                                {col.links.map((link, j) => (
                                    <li key={j}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-volt-200/60 hover:text-volt-300 transition-colors duration-200"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-volt-200/40">{t.copy}</p>
                    <div className="flex items-center gap-1 text-xs text-volt-200/40">

                        <span>by Voltech.h Team</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
