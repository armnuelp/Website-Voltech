"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoExpand } from "react-icons/io5";
import { useLang } from "@/context/LanguageContext";

export default function ProductGalleryModal({ isOpen, onClose, title = "Product Gallery", subtitle = "Our Collection" }) {
    const { lang } = useLang();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    // Fetch images when modal opens
    useEffect(() => {
        if (isOpen && images.length === 0) {
            setLoading(true);
            fetch("/products-assets")
                .then((res) => res.json())
                .then((data) => {
                    // Localize titles
                    const localizedData = data.map((item, index) => ({
                        src: item.src || item,
                        title: `${lang === 'id' ? 'Produk' : 'Product'} ${index + 1}`
                    }));
                    setImages(localizedData);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to load product images:", err);
                    setLoading(false);
                });
        }
    }, [isOpen, lang]); // Re-run if lang changes (though modal usually closes on nav)

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                if (selectedImage) {
                    setSelectedImage(null);
                } else {
                    onClose();
                }
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose, selectedImage]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md"
                    onClick={onClose}
                >
                    {/* Sticky Header */}
                    <div
                        className="sticky top-0 z-[60] w-full px-4 py-4 flex items-center justify-between bg-black/80 backdrop-blur-md border-b border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col">
                            <h2 className="text-2xl font-bold text-white tracking-wide">
                                {title}
                            </h2>
                            {subtitle && (
                                <p className="text-sm text-gray-400">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300"
                        >
                            <IoClose size={28} />
                        </button>
                    </div>

                    {/* Gallery Container */}
                    <div
                        className="flex-1 overflow-y-auto p-4 md:p-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="container mx-auto pb-20">
                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-volt-500"></div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {images.map((item, index) => {
                                        // Handle backward compatibility if API returns strings
                                        const src = item.src || item;
                                        const itemTitle = item.title || `Product ${index + 1}`;

                                        return (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-surface-elevated cursor-pointer border border-white/5 hover:border-volt-500/50 transition-all duration-300"
                                                onClick={() => setSelectedImage(item)}
                                            >
                                                <img
                                                    src={src}
                                                    alt={itemTitle}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <IoExpand className="text-white text-4xl transform scale-50 group-hover:scale-100 transition-transform duration-300" />
                                                </div>

                                                {/* Product Title Overlay */}
                                                <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                                                    <p className="text-white font-medium text-center truncate">
                                                        {itemTitle}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Lightbox Modal */}
                    <AnimatePresence>
                        {selectedImage && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(null);
                                }}
                            >
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute top-6 right-6 z-50 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300"
                                >
                                    <IoClose size={32} />
                                </button>
                                <div className="max-w-4xl w-full flex flex-col items-center">
                                    <img
                                        src={selectedImage?.src || selectedImage}
                                        alt="Product Detail"
                                        className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl shadow-volt-500/20 mb-4"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <h3 className="text-2xl font-bold text-white mt-2">
                                        {selectedImage?.title || 'Product Detail'}
                                    </h3>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
