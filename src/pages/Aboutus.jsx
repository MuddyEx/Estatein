import Navbar from "../components/Navbar"
import Feature2 from "../components/Feature2"
import Feature3 from "../components/Feature3";
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import Success from "@/components/Success";
import Feature4 from "@/components/Feature4";

const Aboutus = () => {
  return (
    <div style={{backgroundColor: 'black', width: '100%',}} >
        <Navbar />
        <Feature2 />
        <Feature3 />
        <Success />
        <Feature4 />
        <Testimonials />
        <Footer />
        
    </div>
  )
}

export default Aboutus