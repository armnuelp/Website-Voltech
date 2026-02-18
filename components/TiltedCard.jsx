import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import './TiltedCard.css';

const springValues = {
    damping: 30,
    stiffness: 100,
    mass: 2
};

export default function TiltedCard({
    imageSrc,
    images = [], // New prop for array of images
    altText = 'Tilted card image',
    captionText = '',
    containerHeight = '300px',
    containerWidth = '100%',
    imageHeight = '300px',
    imageWidth = '300px',
    scaleOnHover = 1.1,
    rotateAmplitude = 14,
    showMobileWarning = true,
    showTooltip = true,
    overlayContent = null,
    displayOverlayContent = false
}) {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useMotionValue(0), springValues);
    const rotateY = useSpring(useMotionValue(0), springValues);
    const scale = useSpring(1, springValues);
    const opacity = useSpring(0);
    const rotateFigcaption = useSpring(0, {
        stiffness: 350,
        damping: 30,
        mass: 1
    });

    const [lastY, setLastY] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    // Determine which images to use
    // If 'images' contains objects { src, title }, use them.
    // Otherwise wrap single imageSrc in compatible object structure.
    const imageList = images.length > 0
        ? images
        : [{ src: imageSrc, title: captionText || altText }];

    const currentItem = imageList[currentIndex];
    const currentSrc = currentItem?.src || currentItem; // Handle if passing string array fallback
    const currentTitle = currentItem?.title || captionText;

    // Auto-loop logic
    useEffect(() => {
        if (imageList.length <= 1 || isHovering) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % imageList.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [imageList.length, isHovering]);

    function handleMouse(e) {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;

        const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
        const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

        rotateX.set(rotationX);
        rotateY.set(rotationY);

        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);

        const velocityY = offsetY - lastY;
        rotateFigcaption.set(-velocityY * 0.6);
        setLastY(offsetY);
    }

    function handleMouseEnter() {
        setIsHovering(true);
        scale.set(scaleOnHover);
        opacity.set(1);
    }

    function handleMouseLeave() {
        setIsHovering(false);
        opacity.set(0);
        scale.set(1);
        rotateX.set(0);
        rotateY.set(0);
        rotateFigcaption.set(0);
    }

    return (
        <figure
            ref={ref}
            className="tilted-card-figure"
            style={{
                height: containerHeight,
                width: containerWidth
            }}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showMobileWarning && (
                <div className="tilted-card-mobile-alert">This effect is not optimized for mobile. Check on desktop.</div>
            )}

            <motion.div
                className="tilted-card-inner"
                style={{
                    width: imageWidth,
                    height: imageHeight,
                    rotateX,
                    rotateY,
                    scale
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentSrc} // Key change triggers animation
                        src={currentSrc}
                        alt={altText}
                        className="tilted-card-img absolute inset-0 object-cover"
                        style={{
                            width: imageWidth,
                            height: imageHeight
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    />
                </AnimatePresence>

                {/* Overlay Logic:
                    1. If external content is provided (Portfolio), render it full-size.
                    2. Else (Products), render the internal dynamic title overlay. 
                */}
                {displayOverlayContent && overlayContent ? (
                    <motion.div className="tilted-card-overlay absolute inset-0 z-30">
                        {overlayContent}
                    </motion.div>
                ) : (
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent pointer-events-none z-20">
                        <motion.div
                            key={currentTitle}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-wide drop-shadow-md">
                                {currentTitle}
                            </h3>
                        </motion.div>
                    </div>
                )}
            </motion.div>

            {showTooltip && (
                <motion.figcaption
                    className="tilted-card-caption"
                    style={{
                        x,
                        y,
                        opacity,
                        rotate: rotateFigcaption
                    }}
                >
                    {captionText}
                </motion.figcaption>
            )}
        </figure>
    );
}
