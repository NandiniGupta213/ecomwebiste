import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './slices/Hero';
import Carousel from './slices/Carousel';
import SkyDive from './slices/SkyDive';
import AlternatingText from './slices/AlternatingText';
import ViewCanvas from './components/ViewCanvas';
import AboutPage from '../src/slices/About/page';     
import BlogPage from '../src/slices/Blog/page';
import ContactPage from '../src/slices/Contact/page';
import ShopPage from '../src/slices/Shop/page';
import CartPage from '../src/slices/Cart/page';

function App() {
  return (
    <div className="overflow-x-hidden bg-yellow-300">
      <Header />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Carousel />
              <SkyDive />
              <AlternatingText />
            </>
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
      <Footer />
      <ViewCanvas />
    </div>
  );
}

export default App;