"use client";

import { useEffect, useMemo, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import content from "@/data/content";
import Carousel from "./Carousel";
import "./Carousel.css";
import SectionTitle from "./SectionTitle";

export default function Portfolio() {
    const { lang } = useLang();
    const t = content[lang].portfolio;

    const [baseWidth, setBaseWidth] = useState(320);

    // ✅ otomatis dari folder (via API)
    const [assets, setAssets] = useState({
        software: [],
        hardware: [],
        design: [],
    });

    // Fetch asset list (auto-update mengikuti isi folder)
    useEffect(() => {
        let alive = true;

        const load = async () => {
            try {
                const res = await fetch("/portfolio-assets", { cache: "no-store" });
                const data = await res.json();

                if (!alive) return;

                setAssets({
                    software: Array.isArray(data.software) ? data.software : [],
                    hardware: Array.isArray(data.hardware) ? data.hardware : [],
                    design: Array.isArray(data.design) ? data.design : [],
                });
            } catch (err) {
                console.error("Failed to load portfolio assets:", err);
            }
        };

        load();
        return () => {
            alive = false;
        };
    }, []);

    // Responsive baseWidth (sama seperti punyamu)
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const containerPadding = 32; // px-4 * 2
            const gap = 32; // gap-8

            if (width < 768) {
                setBaseWidth(width - containerPadding);
            } else if (width < 1280) {
                setBaseWidth((width - containerPadding - gap) / 2);
            } else {
                setBaseWidth(360);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Optional detail text untuk Design
    const designDetails = useMemo(
        () => [
            "Turbin angin segala arah",
            "Efisiensi tinggi di kecepatan rendah",
            "Desain aerodinamis inovatif",
            "Material ringan dan kuat",
            "Sistem monitoring pintar",
        ],
        []
    );

    // Generator items dari hasil scan folder
    const generateItems = (list, label, detailList = []) => {
        const categories = t.categories || [];

        return list.map((a, index) => {
            const category = categories.length
                ? categories[index % categories.length]
                : null;

            const title = category?.name || `${label} Project ${index + 1}`;
            const descFromCategory =
                category?.items?.map((it) => it.title).join(", ") || "";

            return {
                id: `${label}-${index + 1}`,
                title,
                description:
                    descFromCategory ||
                    `Innovative ${label} solution showcasing our expertise.`,
                image: a.img,
                hoverImage: a.hover || a.img, // ✅ fallback kalau hover tidak ada
                detailText:
                    detailList[index] ||
                    `Detailed view of ${title}. Represents high-quality engineering and design.`,
            };
        });
    };

    const softwareItems = useMemo(
        () => generateItems(assets.software, "Software"),
        [assets.software]
    );

    const hardwareItems = useMemo(
        () => generateItems(assets.hardware, "Hardware"),
        [assets.hardware]
    );

    const designItems = useMemo(
        () => generateItems(assets.design, "Design", designDetails),
        [assets.design, designDetails]
    );

    return (
        <section
            id="portfolio"
            className="relative py-20 bg-surface-dark overflow-hidden"
        >
            <div className="container mx-auto px-4 z-10 relative">
                <SectionTitle title={t.title} subtitle={t.subtitle} align="center" />

                <div ref={(el) => {
                    if (!el) return;
                    const observer = new ResizeObserver((entries) => {
                        for (const entry of entries) {
                            const width = entry.contentRect.width;
                            const gap = 32; // gap-8 = 32px

                            // Elegant Fluid Logic:
                            // Mobile (< 640px): 1 column (full width)
                            // Tablet (640px - 1024px): 2 columns
                            // Desktop (>= 1024px): 3 columns

                            if (width < 640) {
                                // Cap width to match Product Card max-width (450px) + padding (32px)
                                setBaseWidth(Math.min(width, 482));
                            } else if (width < 1024) {
                                setBaseWidth((width - gap) / 2);
                            } else {
                                setBaseWidth((width - (gap * 2)) / 3);
                            }
                        }
                    });
                    observer.observe(el);
                    return () => observer.disconnect();
                }} className="w-full relative flex flex-wrap items-start justify-center gap-8 mt-10">
                    {/* Carousel 1 (Software) */}
                    <div className="flex items-center justify-center py-4">
                        <Carousel
                            items={softwareItems}
                            baseWidth={Math.floor(baseWidth)}
                            autoplay={true}
                            autoplayDelay={3000}
                            pauseOnHover={true}
                            loop={true}
                            round={false}
                        />
                    </div>

                    {/* Carousel 2 (Hardware) */}
                    <div className="flex items-center justify-center py-4">
                        <Carousel
                            items={hardwareItems}
                            baseWidth={Math.floor(baseWidth)}
                            autoplay={true}
                            autoplayDelay={4000}
                            pauseOnHover={true}
                            loop={true}
                            round={false}
                        />
                    </div>

                    {/* Carousel 3 (Design) */}
                    <div className="flex items-center justify-center py-4">
                        <Carousel
                            items={designItems}
                            baseWidth={Math.floor(baseWidth)}
                            autoplay={true}
                            autoplayDelay={5000}
                            pauseOnHover={true}
                            loop={true}
                            round={false}
                        />
                    </div>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-volt-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-spark-400/5 rounded-full blur-[120px]" />
            </div>
        </section>
    );
}
