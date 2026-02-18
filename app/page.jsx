import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Products from '@/components/Products';
import Portfolio from '@/components/Portfolio';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <main>
            <Navbar />
            <Hero />
            <About />
            <Services />
            <Portfolio />
            <WhyChooseUs />
            <Products />
            <FAQ />
            <FinalCTA />
            <Footer />
        </main>
    );
}
