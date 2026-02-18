'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/context/LanguageContext';
import content from '@/data/content';
import SectionTitle from './SectionTitle';
import TiltedCard from './TiltedCard';
import ProductGalleryModal from './ProductGalleryModal';
import { motion } from 'framer-motion';

export default function Products() {
    const { lang } = useLang();
    const t = content[lang].products;
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [productImages, setProductImages] = useState([]);

    // Fetch product images
    useEffect(() => {
        fetch('/products-assets')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProductImages(data);
                }
            })
            .catch(err => console.error("Failed to load product images:", err));
    }, []);

    // Generate localized images (override API title)
    const localizedImages = productImages.map((img, i) => ({
        src: img.src || img,
        title: `${lang === 'id' ? 'Produk' : 'Product'} ${i + 1}`
    }));

    // Limit to exactly 2 cards
    const displayItems = localizedImages.slice(0, 2).map((_, index) => {
        // Fallback to content data if available, otherwise generic
        const contentItem = t.items[index] || {};

        // Distribute images:
        // Card 1 (index 0): Gets all EVEN indexed images (0, 2, 4...)
        // Card 2 (index 1): Gets all ODD indexed images (1, 3, 5...)
        // This ensures both cards have different sets to loop through
        const cardImages = localizedImages.filter((__, i) => i % 2 === index);

        // Ensure at least one image exists (the one at current index)
        if (cardImages.length === 0 && localizedImages[index]) {
            cardImages.push(localizedImages[index]);
        }

        const initialImageObj = localizedImages[index];

        return {
            ...contentItem,
            image: initialImageObj?.src,
            images: cardImages,
            title: initialImageObj?.title || contentItem.title || `${lang === 'id' ? 'Produk' : 'Product'} ${index + 1}`,
            desc: contentItem.desc || 'High-quality product from Voltech.h',
            tags: contentItem.tags || ['Product', 'Innovation']
        };
    });

    return (
        <section id="products" className="py-20 bg-surface-dark relative overflow-hidden">
            <div className="container mx-auto px-4 z-10 relative">
                <SectionTitle title={t.title} subtitle={t.subtitle} align="center" />

                {/* 2-Column Grid for Desktop, 1-Column for Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 px-4 md:px-0 max-w-5xl mx-auto">
                    {displayItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex justify-center"
                        >
                            <div style={{ width: '100%', maxWidth: '450px', aspectRatio: '3/4' }}>
                                <TiltedCard
                                    imageSrc={item.image}
                                    images={item.images} // Pass the array for looping
                                    altText={item.title}
                                    captionText={item.title}
                                    containerHeight="100%"
                                    containerWidth="100%"
                                    imageHeight="100%"
                                    imageWidth="100%"
                                    rotateAmplitude={10}
                                    scaleOnHover={1.03}
                                    showMobileWarning={false}
                                    showTooltip={false} // Disable floating tooltip
                                    displayOverlayContent={false} // Use internal dynamic title
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => setIsGalleryOpen(true)}
                        className="px-8 py-3 rounded-full bg-surface-elevated border border-surface-border text-volt-200 hover:text-white hover:border-volt-500 hover:bg-volt-500/10 transition-all duration-300 cursor-pointer"
                    >
                        {t.viewMore}
                    </button>
                </div>
            </div>

            {/* Product Gallery Modal */}
            <ProductGalleryModal
                isOpen={isGalleryOpen}
                onClose={() => setIsGalleryOpen(false)}
            />

            {/* Background Elements */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-volt-500/5 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-spark-500/5 rounded-full blur-[128px] pointer-events-none" />
        </section>
    );
}
