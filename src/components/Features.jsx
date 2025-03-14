import GmailLogo from '../assets/Icon Container.png';
import Unlock from '../assets/Unlock.png';
import Effortless from '../assets/Effortless.png';
import Smart from '../assets/Smart.png';
import { ArrowUpRight } from 'lucide-react';

export default function Features() {
    const features = [
      {
        name: 'Find Your Dream Home',
        logo: GmailLogo,
        direct: true,
      },
      {
        name: 'Unlock Property Value',
        logo: Unlock,
        direct: true,
      },
      {
        name: 'Effortless Property Management',
        logo: Effortless,
        direct: true,
      },
      {
        name: 'Smart Investments, Informed Decisions',
        logo: Smart,
        direct: true,
      },
    ];

    return (
        <section>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-3">
            {features.map((app, index) => (
              <div key={index} className="overflow-hidden  shadow-[#4D4D4D] bg-[#1A1A1A] rounded shadow relative flex flex-col items-center text-center p-5">
                <div className="absolute top-4 right-4 text-[#4D4D4D]">
                  <ArrowUpRight className="w-6 h-9" />
                </div>
                <img className="w-16 h-16 mb-4" src={app.logo} alt={app.name} />
                <p className="text-sm font-semibold text-white mb-2">{app.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}
