import PropertiesHero from "@/components/PropertiesHero";
import Navbar from "../components/Navbar"
import AdvancedSearch from '../components/SearchBar';
import Footer from '../components/Footer';
import PropertyType from "@/components/PropertyType";
import Properties from "@/components/Properties";


const PropertiesPage = () => {
  return (
    <div style={{backgroundColor: 'black', width: '100%',}}>
        <Navbar />
        <PropertiesHero/>
        <AdvancedSearch/>
        <Properties/>
        <PropertyType/>
        <Footer/>   
    </div>
  )
}

export default PropertiesPage