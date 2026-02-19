import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollFix from '@/components/ScrollFix';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
});

export const metadata = {
    title: 'Voltech.h — Smart Energy Infrastructure for Indonesia',
    description:
        'Voltech.h menghadirkan solusi teknologi energi terdepan: smart grid, solar engineering, energy storage, dan analytics untuk masa depan Indonesia yang berkelanjutan.',
    keywords: ['energy technology', 'smart grid', 'solar engineering', 'Indonesia', 'Voltech.h', 'teknologi energi'],
    authors: [{ name: 'Voltech.h' }],
    icons: {
        icon: '/assets/icon/IMG_8248.PNG',
        shortcut: '/assets/icon/IMG_8248.PNG',
        apple: '/assets/icon/IMG_8248.PNG',
    },
    openGraph: {
        title: 'Voltech.h — Smart Energy Infrastructure',
        description:
            'Solusi teknologi energi terdepan untuk Indonesia. Smart grid, solar engineering, energy storage & analytics.',
        url: 'https://voltech-h.id',
        siteName: 'Voltech.h',
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Voltech.h — Smart Energy Infrastructure',
        description:
            'Solusi teknologi energi terdepan untuk Indonesia.',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="id" className={`${inter.variable} ${outfit.variable} overflow-x-hidden`}>
            <body className="font-sans antialiased overflow-x-hidden">
                <ScrollFix />
                <ScrollToTop />
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </body>
        </html>
    );
}
