"use client";

import { useRef, useEffect, useState } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    PanInfo,
    useScroll,
    useAnimationFrame
} from "framer-motion";

import "./CircularGallery.css";

const CircularGallery = ({
    items,
    bend = 3,
    textColor = "#ffffff",
    borderRadius = 0.05,
    font = "bold 30px Helvetica, Arial, sans-serif",
    scrollSpeed = 2, // Speed of auto-scroll (not yet fully implemented auto-scroll logic, relying on drag for now)
    scrollEase = 0.05, // Damping for the spring
}) => {
    const containerRef = useRef(null);
    const cylinderRef = useRef(null);

    // Rotation value (in degrees)
    const rotation = useMotionValue(0);

    // Smooth rotation with spring physics
    const smoothRotation = useSpring(rotation, {
        damping: 20,
        stiffness: 100,
        mass: 1,
    });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const [isDragging, setIsDragging] = useState(false);
    const autoRotateSpeed = scrollSpeed * 0.1; // Adjust multiplier

    useAnimationFrame((t, delta) => {
        if (!isDragging) {
            rotation.set(rotation.get() + (autoRotateSpeed * (delta / 16)));
        }
    });

    const handlePan = (event, info) => {
        // Calculate rotation based on drag delta
        const delta = info.delta.x * 0.1;
        rotation.set(rotation.get() + delta);
    };

    const handlePanStart = () => setIsDragging(true);
    const handlePanEnd = () => setIsDragging(false);

    // Calculate the angle for each item
    const angleStep = 360 / items.length;

    // Responsive item width and radius
    const [itemWidth, setItemWidth] = useState(300);
    const [radius, setRadius] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth < 640 ? 250 : 400; // Smaller cards on mobile
            setItemWidth(width);
            // radius = (n * width) / (2pi)
            // Add some spacing factor?
            const r = (items.length * width) / (2 * Math.PI);
            setRadius(r);
        };

        handleResize(); // Initial call
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [items.length]);

    return (
        <div className="circular-gallery-container" ref={containerRef}>
            <div
                className="gallery-scene"
                style={{
                    perspective: `${bend * 500}px`, /* Adjust perspective based on bend */
                }}
            >
                <motion.div
                    ref={cylinderRef}
                    className="gallery-cylinder"
                    style={{
                        transformStyle: "preserve-3d",
                        rotateY: smoothRotation,
                    }}
                    onPan={handlePan}
                    onPanStart={handlePanStart}
                    onPanEnd={handlePanEnd}
                /* Add cursor styles for dragging preference */
                >
                    {items.map((item, index) => {
                        const angle = index * angleStep;
                        return (
                            <div
                                key={index}
                                className="gallery-item"
                                style={{
                                    position: "absolute",
                                    width: `${itemWidth}px`,
                                    height: "100%", // inherit from container
                                    left: "50%",
                                    top: "0",
                                    marginLeft: `-${itemWidth / 2}px`,
                                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                    // backfaceVisibility: "hidden", // optional
                                }}
                            >
                                <div
                                    className="gallery-card"
                                    style={{
                                        borderRadius: `${borderRadius * 100}px`,
                                        overflow: 'hidden',
                                        height: '100%',
                                        background: '#222',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        // border: `1px solid ${textColor}`
                                    }}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{ width: '100%', height: '70%', objectFit: 'cover', userSelect: 'none', pointerEvents: 'none' }}
                                    />
                                    <div style={{ padding: '20px', color: textColor }}>
                                        <h3 style={{ margin: 0 }}>{item.title}</h3>
                                        <p style={{ margin: '5px 0 0', opacity: 0.8 }}>{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
            <div style={{
                position: "absolute", bottom: 20, left: 0, right: 0, textAlign: "center",
                pointerEvents: "none", color: textColor, opacity: 0.6
            }}>
                Creating Future Technology
            </div>
        </div>
    );
};

export default CircularGallery;
