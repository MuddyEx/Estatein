import HeroSection from '../components/Hero';
import FeaturesSection from '../components/Features';
import FeaturedP from '../components/FeaturedProperties';
import Testimonials from '../components/Testimonials';
import HowItWorks from '../components/HowItWorks';
import FAQ  from '../components/Faq';
import BFooter from '../components/BFooter';
import Footer from '../components/Footer';
import AdvancedSearch from '../components/SearchBar';
import Navbar from '../components/Navbar';
import PropertyType from "@/components/PropertyType";



const LandingPage = () => {
  return (
     <div style={{backgroundColor: 'black', width: '100%', }}>
       <Navbar/>
       <HeroSection />
       <FeaturesSection/>
       <AdvancedSearch/>
       <FeaturedP/>
       <PropertyType/>
       <HowItWorks/>
       <FAQ/>
       <Testimonials/>
       <BFooter/>
       <Footer/>
      </div>
  )
}

export default LandingPage