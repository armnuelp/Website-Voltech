import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { FiCircle, FiCode, FiFileText, FiLayers, FiLayout, FiX, FiMaximize2 } from 'react-icons/fi';

import TiltedCard from './TiltedCard';
import './Carousel.css';

// Client Portal for Modals
const ClientPortal = ({ children, selector = 'body' }) => {
    const [mounted, setMounted] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        setMounted(true);
        elementRef.current = document.querySelector(selector);
        return () => setMounted(false);
    }, [selector]);

    return mounted && elementRef.current ? createPortal(children, elementRef.current) : null;
};

const DEFAULT_ITEMS = [
    {
        title: 'Text Animations',
        description: 'Cool text animations for your projects.',
        id: 1,
        icon: <FiFileText className="carousel-icon" />
    },
    {
        title: 'Animations',
        description: 'Smooth animations for your projects.',
        id: 2,
        icon: <FiCircle className="carousel-icon" />
    },
    {
        title: 'Components',
        description: 'Reusable components for your projects.',
        id: 3,
        icon: <FiLayers className="carousel-icon" />
    },
    {
        title: 'Backgrounds',
        description: 'Beautiful backgrounds and patterns for your projects.',
        id: 4,
        icon: <FiLayout className="carousel-icon" />
    },
    {
        title: 'Common UI',
        description: 'Common UI components are coming soon!',
        id: 5,
        icon: <FiCode className="carousel-icon" />
    }
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

function CarouselItem({ item, index, itemWidth, round, trackItemOffset, x, transition, onSelect, onMaximize }) {
    const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
    const outputRange = [90, 0, -90];
    const rotateY = useTransform(x, range, outputRange, { clamp: false });

    // Calculate Strict 3:4 Aspect Ratio Height
    const aspectHeight = useMemo(() => {
        return itemWidth * (4 / 3);
    }, [itemWidth]);

    if (item.image) {
        return (
            <motion.div
                key={`${item?.id ?? index}-${index}`}
                className={`carousel-item ${round ? 'round' : ''}`}
                style={{
                    width: itemWidth,
                    height: aspectHeight, // Enforce height on container
                    rotateY: rotateY,
                    ...(round && { borderRadius: '50%', height: itemWidth }),
                    padding: 0 // Ensure no padding for full image
                }}
                transition={transition}
                onClick={() => onSelect(item)}
            >
                <TiltedCard
                    imageSrc={item.image}
                    altText={item.title}
                    captionText={item.title}
                    containerHeight={`${aspectHeight}px`} // Pass calculated height
                    containerWidth="100%"
                    imageHeight={`${aspectHeight}px`}     // Pass calculated height
                    imageWidth="100%"
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip={true}
                    displayOverlayContent={true}
                    overlayContent={
                        <div className="w-full h-full relative">
                            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none">
                                <h3 className="carousel-item-title text-left">{item.title}</h3>
                                <p className="carousel-item-description line-clamp-2 text-left">{item.description}</p>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onMaximize();
                                }}
                                className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors z-20 backdrop-blur-sm"
                                style={{ pointerEvents: 'auto' }}
                                aria-label="Maximize gallery"
                            >
                                <FiMaximize2 size={18} />
                            </button>
                        </div>
                    }
                />
            </motion.div>
        );
    }

    return (
        <motion.div
            key={`${item?.id ?? index}-${index}`}
            className={`carousel-item ${round ? 'round' : ''}`}
            style={{
                width: itemWidth,
                height: round ? itemWidth : '400px', // Default fixed for non-image
                rotateY: rotateY,
                ...(round && { borderRadius: '50%' })
            }}
            transition={transition}
            onClick={() => onSelect(item)}
        >
            <div className={`carousel-item-header ${round ? 'round' : ''}`}>
                <span className="carousel-icon-container">{item.icon}</span>
            </div>
            <div className="carousel-item-content">
                <div className="carousel-item-title">{item.title}</div>
                <p className="carousel-item-description">{item.description}</p>
            </div>
        </motion.div>
    );
}

export default function Carousel({
    items = DEFAULT_ITEMS,
    baseWidth = 300,
    height = 450,
    autoplay = false,
    autoplayDelay = 3000,
    pauseOnHover = false,
    loop = false,
    round = false
}) {
    const containerPadding = 16;
    const itemWidth = baseWidth - containerPadding * 2;
    const trackItemOffset = itemWidth + GAP;
    const itemsForRender = useMemo(() => {
        if (!loop) return items;
        if (items.length === 0) return [];
        return [items[items.length - 1], ...items, items[0]];
    }, [items, loop]);

    const [position, setPosition] = useState(loop ? 1 : 0);
    const [activeItem, setActiveItem] = useState(null);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isJumping, setIsJumping] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const containerRef = useRef(null);
    useEffect(() => {
        if (pauseOnHover && containerRef.current) {
            const container = containerRef.current;
            const handleMouseEnter = () => setIsHovered(true);
            const handleMouseLeave = () => setIsHovered(false);
            container.addEventListener('mouseenter', handleMouseEnter);
            container.addEventListener('mouseleave', handleMouseLeave);
            return () => {
                container.removeEventListener('mouseenter', handleMouseEnter);
                container.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, [pauseOnHover]);

    useEffect(() => {
        if (!autoplay || itemsForRender.length <= 1) return undefined;
        if (pauseOnHover && isHovered) return undefined;

        const timer = setInterval(() => {
            setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
        }, autoplayDelay);

        return () => clearInterval(timer);
    }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

    useEffect(() => {
        const startingPosition = loop ? 1 : 0;
        setPosition(startingPosition);
        x.set(-startingPosition * trackItemOffset);
    }, [items.length, loop, trackItemOffset, x]);

    useEffect(() => {
        if (!loop && position > itemsForRender.length - 1) {
            setPosition(Math.max(0, itemsForRender.length - 1));
        }
    }, [itemsForRender.length, loop, position]);

    const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

    const handleAnimationStart = () => {
        setIsAnimating(true);
    };

    const handleAnimationComplete = () => {
        if (!loop || itemsForRender.length <= 1) {
            setIsAnimating(false);
            return;
        }
        const lastCloneIndex = itemsForRender.length - 1;

        if (position === lastCloneIndex) {
            setIsJumping(true);
            const target = 1;
            setPosition(target);
            x.set(-target * trackItemOffset);
            requestAnimationFrame(() => {
                setIsJumping(false);
                setIsAnimating(false);
            });
            return;
        }

        if (position === 0) {
            setIsJumping(true);
            const target = items.length;
            setPosition(target);
            x.set(-target * trackItemOffset);
            requestAnimationFrame(() => {
                setIsJumping(false);
                setIsAnimating(false);
            });
            return;
        }

        setIsAnimating(false);
    };

    const handleDragEnd = (_, info) => {
        const { offset, velocity } = info;
        const direction =
            offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
                ? 1
                : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
                    ? -1
                    : 0;

        if (direction === 0) return;

        setPosition(prev => {
            const next = prev + direction;
            const max = itemsForRender.length - 1;
            return Math.max(0, Math.min(next, max));
        });
    };

    const dragProps = loop
        ? {}
        : {
            dragConstraints: {
                left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
                right: 0
            }
        };

    const activeIndex =
        items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

    // Fixed pagination logic
    const handleDotClick = (dotIndex) => {
        const currentCycleStart = Math.floor(activeIndex / 5) * 5;
        let targetIndex = currentCycleStart + dotIndex;

        // Wrap around if we exceed total items
        if (targetIndex >= items.length) {
            targetIndex = targetIndex % items.length;
        }

        const targetPosition = loop ? targetIndex + 1 : targetIndex;
        setPosition(targetPosition);
    };

    // Scroll Lock and ESC Key Handler
    useEffect(() => {
        if (isGalleryOpen || activeItem) {
            // Prevent background scrolling
            document.body.style.overflow = 'hidden';

            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    if (activeItem) setActiveItem(null);
                    else setIsGalleryOpen(false);
                }
            };

            window.addEventListener('keydown', handleKeyDown);

            return () => {
                // Restore scrolling
                document.body.style.overflow = '';
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isGalleryOpen, activeItem]);

    // Dynamic Main Carousel Height based on 3:4 ratio of ITEM
    // We must ensure the container is tall enough for the tallest item
    const containerHeight = useMemo(() => {
        if (round) return baseWidth;
        // Item Height = (baseWidth - padding*2) * (4/3)
        // Add a bit of buffer
        return (baseWidth - containerPadding * 2) * (4 / 3) + 40;
    }, [baseWidth, round]);

    return (
        <div
            ref={containerRef}
            className={`carousel-container ${round ? 'round' : ''}`}
            style={{
                width: `${baseWidth}px`,
                height: `${containerHeight}px`,
                ...(round && { borderRadius: '50%' })
            }}
        >
            <div className="flex-1 overflow-hidden relative w-full h-full flex flex-col">
                <motion.div
                    className="carousel-track flex-1"
                    drag={isAnimating ? false : 'x'}
                    {...dragProps}
                    style={{
                        width: itemWidth,
                        gap: `${GAP}px`,
                        perspective: 1000,
                        perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
                        x
                    }}
                    onDragEnd={handleDragEnd}
                    animate={{ x: -(position * trackItemOffset) }}
                    transition={effectiveTransition}
                    onAnimationStart={handleAnimationStart}
                    onAnimationComplete={handleAnimationComplete}
                >
                    {itemsForRender.map((item, index) => (
                        <CarouselItem
                            key={`${item?.id ?? index}-${index}`}
                            item={item}
                            index={index}
                            itemWidth={itemWidth}
                            round={round}
                            trackItemOffset={trackItemOffset}
                            x={x}
                            transition={effectiveTransition}
                            onSelect={setActiveItem}
                            onMaximize={() => setIsGalleryOpen(true)}
                        />
                    ))}
                </motion.div>

                <div className={`carousel-indicators-container ${round ? 'round' : ''} h-8 shrink-0`}>
                    <div className="carousel-indicators">
                        {Array.from({ length: 5 }).map((_, index) => {
                            const isActive = (activeIndex % 5) === index;
                            return (
                                <motion.div
                                    key={index}
                                    className={`carousel-indicator ${isActive ? 'active' : 'inactive'}`}
                                    animate={{
                                        scale: isActive ? 1.2 : 1
                                    }}
                                    onClick={() => handleDotClick(index)}
                                    transition={{ duration: 0.15 }}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Gallery Modal - Via Portal */}
            <ClientPortal selector="body">
                <AnimatePresence>
                    {isGalleryOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[9999] bg-[#050505] overflow-hidden"
                            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                            onClick={() => setIsGalleryOpen(false)}
                        >
                            {/* Fixed Close Button - Always Visible */}
                            <button
                                onClick={() => setIsGalleryOpen(false)}
                                className="fixed top-4 right-4 z-[10000] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md border border-white/10"
                                aria-label="Close gallery"
                            >
                                <FiX size={24} />
                            </button>

                            <div className="relative w-full h-full flex flex-col p-4 sm:p-8 max-w-7xl mx-auto">
                                {/* Header */}
                                <div className="mb-6 shrink-0 relative z-[120] pt-12 sm:pt-0">
                                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Gallery</h2>
                                    <p className="text-volt-200/60 text-sm mt-1">Explore our work</p>
                                </div>

                                {/* Grid - Scrollable */}
                                <div className="flex-1 overflow-y-auto min-h-0 pr-2 custom-scrollbar overscroll-contain pb-20">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
                                        {items.map((item, index) => (
                                            <div
                                                key={item.id || index}
                                                className="w-full aspect-[3/4] relative"
                                            >
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className="group relative w-full h-full rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-volt-500/50 transition-colors shadow-lg"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsGalleryOpen(false); // Close gallery first
                                                        setTimeout(() => setActiveItem(item), 100); // Small delay for smooth transition
                                                    }}
                                                >
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                        loading="lazy"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                                        <span className="text-white font-semibold text-lg drop-shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                            {item.title}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Detail Modal - Via Portal */}
                <AnimatePresence>
                    {activeItem && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl" /* z-10000 to be above gallery if needed, but portal order handles it */
                            onClick={() => setActiveItem(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-[#0d0716] border border-surface-border rounded-2xl p-4 sm:p-6 max-w-lg w-full relative overflow-hidden shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setActiveItem(null)}
                                    className="absolute top-4 right-4 text-volt-200 hover:text-white transition-colors z-20 bg-black/20 p-2 rounded-full backdrop-blur-sm"
                                >
                                    <FiX size={24} />
                                </button>

                                <div className="flex flex-col gap-4">
                                    {(activeItem.hoverImage || activeItem.image) ? (
                                        <div className="w-full flex justify-center rounded-xl overflow-hidden bg-white/5 aspect-square relative">
                                            {/* Force 1:1 or full view as requested "mode image 1:1" */}
                                            <img
                                                src={activeItem.hoverImage || activeItem.image}
                                                alt={activeItem.title}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-2">
                                            <span className="text-black text-2xl">{activeItem.icon}</span>
                                        </div>
                                    )}

                                    <div>
                                        <h3 className="text-2xl font-bold font-display text-white mb-2">
                                            {activeItem.title}
                                        </h3>
                                        <p className="text-volt-200 leading-relaxed max-h-[150px] overflow-y-auto custom-scrollbar">
                                            {activeItem.detailText || activeItem.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </ClientPortal>
        </div>
    );
}
