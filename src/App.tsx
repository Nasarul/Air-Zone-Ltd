import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import TourPackages from './components/TourPackages';
import AirTicketing from './components/AirTicketing';
import WhyChooseUs from './components/WhyChooseUs';
import VisaServices from './components/VisaServices';
import Team from './components/Team';
import Advertising from './components/Advertising';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Dashboard imports
import { DashboardProvider, useDashboard } from './components/dashboard/DashboardContext';
import AuthModule from './components/dashboard/AuthModule';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ToastContainer from './components/dashboard/ui/ToastContainer';
import ModalContainer from './components/dashboard/ui/ModalContainer';
import { Error404, Error500 } from './components/dashboard/pages/ErrorPages';

function AppContent() {
  const { page } = useDashboard();

  if (page === 'landing') {
    return (
      <div className="min-h-screen font-sans antialiased bg-slate-50 text-slate-800 transition-colors">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <About />
          <TourPackages />
          <AirTicketing />
          <WhyChooseUs />
          <VisaServices />
          <Team />
          <Advertising />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    );
  }

  if (page === 'login' || page === 'forgot-password' || page === 'reset-password' || page === 'verify-email') {
    return (
      <>
        <AuthModule />
        <ToastContainer />
        <ModalContainer />
      </>
    );
  }

  if (page === 'dashboard') {
    return (
      <>
        <DashboardLayout />
        <ToastContainer />
        <ModalContainer />
      </>
    );
  }

  if (page === '404') {
    return <Error404 />;
  }

  if (page === '500') {
    return <Error500 />;
  }

  // Fallback to 404
  return <Error404 />;
}

export default function App() {
  return (
    <DashboardProvider>
      <AppContent />
    </DashboardProvider>
  );
}
