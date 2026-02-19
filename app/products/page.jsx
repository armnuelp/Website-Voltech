import Navbar from '@/components/Navbar';
import Products from '@/components/Products';
import Footer from '@/components/Footer';

export default function ProductsPage() {
    return (
        <main className="bg-surface-dark min-h-screen">
            <Navbar />
            <div className="pt-24 lg:pt-28">
                <Products />
            </div>
            <Footer />
        </main>
    );
}
