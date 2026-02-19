const content = {
    id: {
        nav: {
            logo: 'Voltech.h',
            links: [
                { label: 'Tentang', href: '#about' },
                { label: 'Layanan', href: '#services' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'Keunggulan', href: '#why-us' },
                { label: 'Produk', href: '#products' },
                { label: 'FAQ', href: '#faq' },
            ],
            cta: 'Hubungi Kami',
        },
        hero: {
            badge: '⚡ Inovasi Teknologi Masa Depan',
            headline: 'Membangun Solusi ',
            headlineHighlight: 'Teknologi Berdampak',
            headlineSuffix: 'untuk Indonesia',
            sub: 'Voltech.h menghadirkan solusi teknologi inovatif, efisien, dan berkelanjutan untuk menciptakan dampak nyata.',
            cta1: 'Mulai Sekarang',
            cta2: 'Pelajari Lebih Lanjut',
        },
        about: {
            title: 'Tentang Kami',
            subtitle: 'Mengapa Voltech.h?',
            paragraphs: [
                'Voltech.h adalah startup inovasi teknologi yang berfokus menciptakan solusi baru yang berdampak nyata bagi lingkungan sekitar. Kami menggabungkan keahlian rekayasa dan pengembangan digital untuk membantu individu, komunitas, maupun bisnis mewujudkan produk dan sistem yang lebih efektif, modern, dan siap digunakan.',
                'Kami menyediakan layanan lengkap mulai dari desain 3D mekanik dan jasa 3D printing, pembuatan hardware (desain skematik PCB hingga routing/layout), pengembangan software (aplikasi dan website), hingga embedded system dan IoT untuk membangun perangkat pintar yang terintegrasi. Dengan tim yang adaptif dan teknologi terkini, Voltech.h berkomitmen menjadi partner pengembangan inovasi—dari ide awal sampai menjadi solusi yang bisa dipakai dan memberi manfaat.',
            ],
            highlights: [
                { number: '5+', label: 'Tahun Pengalaman' },
                { number: '50+', label: 'Proyek Diselesaikan' },
                { number: '99%', label: 'Kepuasan Klien' },
            ],
        },
        services: {
            title: 'Layanan Kami',
            subtitle: 'Solusi teknologi menyeluruh untuk kebutuhan Anda',
            items: [
                {
                    icon: '⚡',
                    title: 'Smart Grid Solutions',
                    desc: 'Sistem jaringan listrik cerdas yang mengoptimalkan distribusi energi secara real-time dengan teknologi IoT dan AI.',
                },
                {
                    icon: '🛠️',
                    title: '3D Mechanical Design & 3D Printing',
                    desc: 'CAD part/assembly, enclosure, bracket, prototyping sampai siap cetak.',
                },
                {
                    icon: '🔌',
                    title: 'Hardware Development',
                    desc: 'Desain skematik dan layout/routing PCB, sistem embedded, serta IoT untuk membangun perangkat pintar yang terintegrasi.',
                },
                {
                    icon: '🖥️',
                    title: 'Software Development',
                    desc: 'Pengembangan aplikasi dan website menggunakan React, Next.js, Node.js, dan teknologi web modern lainnya.',
                },
                {
                    icon: '💡',
                    title: 'Embedded System Development',
                    desc: 'Pengembangan sistem embedded end-to-end untuk menciptakan perangkat pintar yang terintegrasi dan siap digunakan.',
                },
                {
                    icon: '☀️',
                    title: 'System Integration & Prototyping',
                    desc: 'End-to-end: gabung hardware + firmware + aplikasi, uji fungsi, iterasi sampai MVP',
                },
            ],
        },
        whyUs: {
            title: 'Mengapa Memilih Kami',
            subtitle: 'Keunggulan yang membedakan Voltech.h',
            items: [
                {
                    icon: '🎯',
                    title: 'Fokus pada Hasil',
                    desc: 'Kami mengutamakan solusi yang benar-benar terpakai dan memberi manfaat nyata—bukan sekadar konsep.',
                },
                {
                    icon: '🔬',
                    title: 'Riset & Inovasi',
                    desc: 'Kami terus bereksperimen dan mengembangkan teknologi terbaru untuk melahirkan produk yang lebih efektif dan modern.',
                },
                {
                    icon: '🤝',
                    title: 'Kemitraan Jangka Panjang',
                    desc: 'Kami membangun kolaborasi yang transparan dan responsif, mulai dari ide awal sampai solusi siap digunakan dan dikembangkan.',
                },
                {
                    icon: '🌱',
                    title: 'Komitmen Keberlanjutan',
                    desc: 'Kami berkomitmen menghadirkan solusi yang berkelanjutan dan siap berkembang.',
                },
            ],
        },
        products: {
            title: 'Produk Kami',
            subtitle: 'Inovasi teknologi siap pakai dari Voltech.h',
            items: [
                {
                    title: 'Voltech IoT Gateway',
                    desc: 'Perangkat penghubung cerdas untuk integrasi sistem sensor dan cloud, mendukung protokol MQTT dan HTTP.',
                    image: '/assets/portfolio/Hardware/h1.png',
                    tags: ['IoT', 'Connectivity'],
                },
                {
                    title: 'Smart Energy Meter',
                    desc: 'Sistem monitoring konsumsi energi real-time dengan dashboard analitik berbasis AI.',
                    image: '/assets/portfolio/Hardware/h2.png',
                    tags: ['Energy', 'AI'],
                },
                {
                    title: 'Custom 3D Printer',
                    desc: 'Mesin cetak 3D presisi tinggi untuk kebutuhan prototyping cepat dan produksi skala kecil.',
                    image: '/assets/portfolio/Design/d1.png',
                    tags: ['Manufacturing', '3D Print'],
                },
            ],
            viewMore: 'Lihat Semua Produk'
        },
        portfolio: {
            title: 'Portfolio Inovasi',
            subtitle: 'Karya kami yang mengubah dunia',
            categories: [
                {
                    name: 'Clean Energy',
                    color: '#3B82F6', // Royal Blue
                    items: [
                        {
                            title: 'Solar Farm Sumatera',
                            desc: 'Pembangkit listrik tenaga surya 50MW.',
                            image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=500&h=700'
                        },
                        {
                            title: 'Wind Power Java',
                            desc: 'Ladang angin lepas pantai pertama.',
                            image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=500&h=700'
                        },
                        {
                            title: 'Hydro Plant Bali',
                            desc: 'Mikrohidro ramah lingkungan.',
                            image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=500&h=700'
                        }
                    ]
                },
                {
                    name: 'Green Tech',
                    color: '#10B981', // Emerald Green
                    items: [
                        {
                            title: 'Eco-Industrial Park',
                            desc: 'Kawasan industri nol emisi.',
                            image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b0?auto=format&fit=crop&q=80&w=500&h=700'
                        },
                        {
                            title: 'Sustainable Housing',
                            desc: 'Perumahan mandiri energi.',
                            image: 'https://images.unsplash.com/photo-1518770660439-d1f21204218b?auto=format&fit=crop&q=80&w=500&h=700'
                        },
                        {
                            title: 'Vertical Farming',
                            desc: 'Pertanian perkotaan hemat energi.',
                            image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=500&h=700'
                        }
                    ]
                },
                {
                    name: 'Smart Infra',
                    color: '#F59E0B', // Amber
                    items: [
                        {
                            title: 'Smart City Grid',
                            desc: 'Integrasi sistem energi kota.',
                            image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=500&h=700'
                        },
                        {
                            title: 'EV Charging Network',
                            desc: 'Infrastruktur pengisian EV.',
                            image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=500&h=700'
                        },
                        {
                            title: 'IoT Monitoring',
                            desc: 'Sistem monitoring energi real-time.',
                            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=500&h=700'
                        }
                    ]
                },
                {
                    name: 'IoT Systems',
                    color: '#8B5CF6', // Purple
                    items: [
                        {
                            title: 'Smart Meters',
                            desc: 'Monitoring penggunaan listrik.',
                            image: 'https://images.unsplash.com/photo-1518770660439-d1f21204218b?auto=format&fit=crop&q=80&w=500&h=700'
                        },
                        {
                            title: 'Sensor Jaringan',
                            desc: 'Deteksi gangguan otomatis.',
                            image: 'https://images.unsplash.com/photo-1518770660439-d1f21204218b?auto=format&fit=crop&q=80&w=500&h=700'
                        }
                    ]
                },
                {
                    name: 'Consulting',
                    color: '#EC4899', // Pink
                    items: [
                        {
                            title: 'Audit Energi',
                            desc: 'Evaluasi efisiensi pabrik.',
                            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=500&h=700'
                        },
                        {
                            title: 'Feasibility Study',
                            desc: 'Studi kelayakan proyek.',
                            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=500&h=700'
                        }
                    ]
                }
            ]
        },
        faq: {
            title: 'Pertanyaan Umum',
            subtitle: 'Jawaban untuk pertanyaan yang sering diajukan',
            items: [
                {
                    q: 'Apa itu Voltech.h?',
                    a: 'Voltech.h adalah startup inovasi teknologi yang membantu individu, komunitas, dan bisnis mewujudkan produk serta sistem yang berdampak. Layanan kami mencakup desain 3D mekanik & 3D printing, pengembangan PCB (skematik hingga layout), software (aplikasi & website), serta embedded system dan IoT.',
                },
                {
                    q: 'Berapa lama waktu implementasi proyek?',
                    a: 'Durasi bervariasi tergantung skala proyek. Proyek skala kecil bisa selesai dalam 1-2 bulan, sedangkan proyek besar membutuhkan 6-12 bulan.',
                },
                {
                    q: 'Apakah Voltech.h melayani seluruh Indonesia?',
                    a: 'Ya. Kami melayani klien dari seluruh Indonesia melalui konsultasi online dan koordinasi jarak jauh. Untuk kebutuhan perangkat/produk fisik, kami dapat membantu proses pengiriman. Kunjungan onsite dapat dilakukan sesuai kesepakatan.',
                },
                {
                    q: 'Bagaimana cara memulai kerja sama?',
                    a: 'Hubungi kami melalui form kontak atau email. Tim kami akan melakukan assessment awal dan menyusun proposal solusi yang disesuaikan dengan kebutuhan Anda.',
                },
                {
                    q: 'Apakah tersedia layanan pemeliharaan?',
                    a: 'Tersedia. Kami menyediakan dukungan setelah proyek selesai, seperti perbaikan bug, pembaruan fitur, optimasi performa, serta maintenance berkala (opsional) sesuai kebutuhan dan paket layanan.',
                },
            ],
        },
        finalCta: {
            title: 'Siap Memulai Transformasi Teknologi?',
            desc: 'Hubungi tim kami hari ini dan temukan solusi teknologi terbaik untuk bisnis Anda.',
            cta: 'Konsultasi Sekarang!!',
            ctaLink: 'https://wa.me/6287757110847',
            ctaSecondary: 'Lihat Portfolio',
        },
        footer: {
            brand: 'Voltech.h',
            tagline: 'Membangun Masa Depan Energi Indonesia',
            columns: [
                {
                    title: 'Layanan',
                    links: [
                        { label: 'Smart Grid', href: '#services' },
                        { label: 'Solar Engineering', href: '#services' },
                        { label: 'Energy Storage', href: '#services' },
                        { label: 'Konsultasi', href: '#services' }
                    ],
                },
                {
                    title: 'Kontak',
                    links: [
                        { label: 'voltechnology.h@gmail.com', href: 'mailto:voltechnology.h@gmail.com' },
                        { label: '+62 877-5711-0847', href: 'https://wa.me/6287757110847' },
                        { label: 'Surabaya, Indonesia', href: '#' }
                    ],
                },
            ],
            socials: [
                { name: 'TikTok', url: 'https://www.tiktok.com/@voltech.h' },
                { name: 'WhatsApp', url: 'https://wa.me/6287757110847' },
                { name: 'Instagram', url: 'https://www.instagram.com/voltech.h' },
                { name: 'GitHub', url: 'https://github.com/Volt-Technology' }
            ],
            copy: '© 2026 Voltech.h. Semua hak dilindungi.',
        },
    },
    en: {
        nav: {
            logo: 'Voltech.h',
            links: [
                { label: 'About', href: '#about' },
                { label: 'Services', href: '#services' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'Why Us', href: '#why-us' },
                { label: 'Product', href: '#products' },
                { label: 'FAQ', href: '#faq' },
            ],
            cta: 'Contact Us',
        },
        hero: {
            badge: '⚡ Future Technology Innovation',
            headline: 'Building Impactful',
            headlineHighlight: 'Technology Solutions',
            headlineSuffix: 'for Indonesia',
            sub: 'Voltech.h delivers innovative, efficient, and sustainable technology solutions to create real impact.',
            cta1: 'Get Started',
            cta2: 'Learn More',
        },
        about: {
            title: 'About Us',
            subtitle: 'Why Voltech.h?',
            paragraphs: [
                'Voltech.h is a technology innovation startup focused on creating new solutions with real impact on the surrounding community. We combine engineering expertise and digital development to help individuals, communities, and businesses build products and systems that are more effective, modern, and ready to use.',
                'We provide end-to-end services—from mechanical 3D design and 3D printing, hardware development (PCB schematics and layout/routing), and software development (apps and websites), to embedded systems and IoT for building integrated smart devices. With an adaptive team and up-to-date technology, Voltech.h is committed to being your innovation partner—from early ideas to solutions that are ready to use and deliver value.',
            ],
            highlights: [
                { number: '5+', label: 'Years of Experience' },
                { number: '50+', label: 'Projects Completed' },
                { number: '99%', label: 'Client Satisfaction' },
            ],
        },
        services: {
            title: 'Our Services',
            subtitle: 'Comprehensive technology solutions for your needs',
            items: [
                {
                    icon: '⚡',
                    title: 'Smart Grid Solutions',
                    desc: 'Intelligent power grid systems that optimize energy distribution in real-time using IoT and AI technology.',
                },
                {
                    icon: '🛠️',
                    title: '3D Mechanical Design & 3D Printing',
                    desc: 'CAD modeling, enclosures, brackets, and rapid prototyping from concept to print-ready parts.',
                },
                {
                    icon: '🔌',
                    title: 'Hardware Development',
                    desc: 'PCB schematics and layout/routing, embedded systems, and IoT for building integrated smart devices.',
                },
                {
                    icon: '🖥️',
                    title: 'Software Development',
                    desc: 'Apps and websites development using React, Next.js, Node.js, and other modern web technologies.',
                },
                {
                    icon: '💡',
                    title: 'Embedded System Development',
                    desc: 'End-to-end embedded system development for building integrated smart devices.',
                },
                {
                    icon: '☀️',
                    title: 'System Integration & Rapid Prototyping',
                    desc: 'End-to-end product development—hardware, firmware, and software integrated into a functional MVP.',
                },
            ],
        },
        whyUs: {
            title: 'Why Choose Us',
            subtitle: 'What sets Voltech.h apart',
            items: [
                {
                    icon: '🎯',
                    title: 'Results-Focused',
                    desc: 'We prioritize solutions that are practical, usable, and deliver real value—not just concepts.',
                },
                {
                    icon: '🔬',
                    title: 'Research & Innovation',
                    desc: 'We continuously explore and apply modern technologies to build smarter and more effective products.',
                },
                {
                    icon: '🤝',
                    title: 'Long-term Partnerships',
                    desc: 'We build transparent, responsive collaborations—from early ideas to solutions that are ready to use and grow.',
                },
                {
                    icon: '🌱',
                    title: 'Sustainability Commitment',
                    desc: 'We are committed to delivering sustainable solutions that are built to scale.',
                },
            ],
        },
        products: {
            title: 'Our Products',
            subtitle: 'Ready-to-use technology innovations from Voltech.h',
            items: [
                {
                    title: 'Voltech IoT Gateway',
                    desc: 'Smart connection device for sensor and cloud system integration, supporting MQTT and HTTP protocols.',
                    image: '/assets/portfolio/Hardware/h1.png',
                    tags: ['IoT', 'Connectivity'],
                },
                {
                    title: 'Smart Energy Meter',
                    desc: 'Real-time energy consumption monitoring system with AI-based analytics dashboard.',
                    image: '/assets/portfolio/Hardware/h2.png',
                    tags: ['Energy', 'AI'],
                },
                {
                    title: 'Custom 3D Printer',
                    desc: 'High-precision 3D printing machine for rapid prototyping and small-scale production needs.',
                    image: '/assets/portfolio/Design/d1.png',
                    tags: ['Manufacturing', '3D Print'],
                },
            ],
            viewMore: 'View All Products'
        },
        portfolio: {
            title: 'Innovation Portfolio',
            subtitle: 'Our work that changes the world',
            categories: [
                {
                    name: 'Clean Energy',
                    color: '#3B82F6', // Royal Blue
                    items: [
                        {
                            title: 'Solar Farm Sumatera',
                            desc: '50MW Solar Power Plant.',
                            image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=500&h=700'
                        },
                        {
                            title: 'Wind Power Java',
                            desc: 'First offshore wind farm.',
                            image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=500&h=700'
                        },
                        {
                            title: 'Hydro Plant Bali',
                            desc: 'Eco-friendly microhydro.',
                            image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=500&h=700'
                        }
                    ]
                },
                {
                    name: 'Green Tech',
                    color: '#10B981', // Emerald Green
                    items: [
                        {
                            title: 'Eco-Industrial Park',
                            desc: 'Zero-emission industrial zone.',
                            image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b0?auto=format&fit=crop&q=80&w=500&h=700'
                        },
                        {
                            title: 'Sustainable Housing',
                            desc: 'Energy independent housing.',
                            image: 'https://images.unsplash.com/photo-1518770660439-d1f21204218b?auto=format&fit=crop&q=80&w=500&h=700'
                        },
                        {
                            title: 'Vertical Farming',
                            desc: 'Energy-efficient urban farming.',
                            image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=500&h=700'
                        }
                    ]
                },
                {
                    name: 'Smart Infra',
                    color: '#F59E0B', // Amber
                    items: [
                        {
                            title: 'Smart City Grid',
                            desc: 'City energy system integration.',
                            image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=500&h=700'
                        },
                        {
                            title: 'EV Charging Network',
                            desc: 'EV charging infrastructure.',
                            image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=500&h=700'
                        },
                        {
                            title: 'IoT Monitoring',
                            desc: 'Real-time energy monitoring.',
                            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=500&h=700'
                        }
                    ]
                },
                {
                    name: 'IoT Systems',
                    color: '#8B5CF6', // Purple
                    items: [
                        {
                            title: 'Smart Meters',
                            desc: 'Electricity usage monitoring.',
                            image: 'https://images.unsplash.com/photo-1518770660439-d1f21204218b?auto=format&fit=crop&q=80&w=500&h=700'
                        },
                        {
                            title: 'Grid Sensors',
                            desc: 'Automatic fault detection.',
                            image: 'https://images.unsplash.com/photo-1518770660439-d1f21204218b?auto=format&fit=crop&q=80&w=500&h=700'
                        }
                    ]
                },
                {
                    name: 'Consulting',
                    color: '#EC4899', // Pink
                    items: [
                        {
                            title: 'Energy Audit',
                            desc: 'Factory efficiency evaluation.',
                            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=500&h=700'
                        },
                        {
                            title: 'Feasibility Study',
                            desc: 'Project feasibility study.',
                            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=500&h=700'
                        }
                    ]
                }
            ]
        },
        faq: {
            title: 'FAQ',
            subtitle: 'Answers to frequently asked questions',
            items: [
                {
                    q: 'What is Voltech.h?',
                    a: 'Voltech.h is a technology innovation startup that helps individuals, communities, and businesses build impactful products and systems. Our services include mechanical 3D design & 3D printing, PCB development (schematics to layout), software development (apps & websites), and embedded systems & IoT.',
                },
                {
                    q: 'How long does project implementation take?',
                    a: 'Duration varies depending on project scale. Small-scale projects can be completed in 1-2 months, while larger projects take 6-12 months.',
                },
                {
                    q: 'Does Voltech.h serve all of Indonesia?',
                    a: 'Yes. We serve clients across Indonesia through online consultations and remote coordination. For physical devices or products, we can support the delivery process. On-site visits are available by agreement.',
                },
                {
                    q: 'How do I start a partnership?',
                    a: 'Contact us through our contact form or email. Our team will conduct an initial assessment and prepare a customized solution proposal.',
                },
                {
                    q: 'Is maintenance service available?',
                    a: 'Yes. We provide post-project support such as bug fixes, feature updates, performance optimization, and optional scheduled maintenance based on your needs and service package.',
                },
            ],
        },
        finalCta: {
            title: 'Ready to Start Your Technology Transformation?',
            desc: 'Contact our team today and discover the best technology solution for your business.',
            cta: 'Consultation Now!!',
            ctaLink: 'https://wa.me/6287757110847',
            ctaSecondary: 'View Portfolio',
        },
        footer: {
            brand: 'Voltech.h',
            tagline: 'Building the Future of Indonesia\'s Energy',
            columns: [
                {
                    title: 'Services',
                    links: [
                        { label: 'Smart Grid', href: '#services' },
                        { label: '3D Mechanical Design & 3D Printing', href: '#services' },
                        { label: 'Hardware Development', href: '#services' },
                        { label: 'Software Development', href: '#services' },
                        { label: 'Embedded System Development', href: '#services' },
                        { label: 'System Integration & Rapid Prototyping', href: '#services' }
                    ],
                },
                {
                    title: 'Contact',
                    links: [
                        { label: 'voltechnology.h@gmail.com', href: 'mailto:voltechnology.h@gmail.com' },
                        { label: '+62 877-5711-0847', href: 'https://wa.me/6287757110847' },
                        { label: 'Surabaya, Indonesia', href: '#' }
                    ],
                },
            ],
            socials: [
                { name: 'TikTok', url: 'https://www.tiktok.com/@voltech.h' },
                { name: 'WhatsApp', url: 'https://wa.me/6287757110847' },
                { name: 'Instagram', url: 'https://www.instagram.com/voltech.h' },
                { name: 'GitHub', url: 'https://github.com/Volt-Technology' }
            ],
            copy: '© 2026 Voltech.h. All rights reserved.',
        },
    },
};

export default content;
