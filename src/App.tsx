import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import TourPackages from './components/TourPackages';
import HajjUmrah from './components/HajjUmrah';
import WhyChooseUs from './components/WhyChooseUs';
import VisaServices from './components/VisaServices';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <TourPackages />
        <HajjUmrah />
        <WhyChooseUs />
        <VisaServices />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
