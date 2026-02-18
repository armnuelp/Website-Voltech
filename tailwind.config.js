/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './context/**/*.{js,jsx}',
    ],
    theme: {
        extend: {
            colors: {
                volt: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#16a34a',
                    600: '#0A6847',
                    700: '#065f46',
                    800: '#064e3b',
                    900: '#0A0F0D',
                    950: '#060a08',
                },
                spark: {
                    50: '#fefce8',
                    100: '#fef9c3',
                    200: '#fef08a',
                    300: '#fde047',
                    400: '#FACC15',
                    500: '#EAB308',
                    600: '#CA8A04',
                    700: '#A16207',
                    800: '#854d0e',
                    900: '#713f12',
                },
                surface: {
                    dark: '#0A0F0D',
                    card: '#111916',
                    elevated: '#1a2420',
                    border: '#2a3a32',
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                display: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
            },
            boxShadow: {
                glow: '0 0 40px rgba(22, 163, 74, 0.15)',
                'glow-lg': '0 0 80px rgba(22, 163, 74, 0.2)',
                'glow-spark': '0 0 40px rgba(250, 204, 21, 0.15)',
                card: '0 4px 24px rgba(0, 0, 0, 0.3)',
                'card-hover': '0 8px 40px rgba(0, 0, 0, 0.4)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'glow-pulse': {
                    '0%, 100%': { opacity: '0.4' },
                    '50%': { opacity: '1' },
                },
            },
        },
    },
    plugins: [],
};
