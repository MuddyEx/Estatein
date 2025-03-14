// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

;

const Feature4= () => {
    const steps = [
        {
          step: "01",
          title: "Discover a World of Possibilities",
          description:
            "Your journey begins with exploring our carefully curated property listings. Use our intuitive search tools to filter properties based on your preferences, including location.",
        },
        {
          step: "02",
          title: "Narrowing Down Your Choices",
          description:
            "Once you've found properties that catch your eye, save them to your account or make a shortlist. This allows you to compare and revisit your favorites as you make your decision.",
        },
        {
          step: "03",
          title: "Personalized Guidance",
          description:
            "Have questions about a property or need more information? Our dedicated team of real estate experts is just a call or message away.",
        },
        {
          step: "04",
          title: "See It for Yourself",
          description:
            "Arrange viewings of the properties you're interested in. We'll coordinate with the property owners and accompany you to ensure you get a firsthand look at your potential new home.",
        },
        {
          step: "05",
          title: "Making Informed Decisions",
          description:
            "Before making an offer, our team will assist you with due diligence, including property inspections, legal checks, and market analysis. We want you to be fully informed.",
        },
        {
          step: "06",
          title: "Getting the Best Deal",
          description:
            "We'll help you negotiate the best terms and prepare your offer. Our goal is to secure the property at the right price and on favorable terms.",
        },
      ];
      return (
        <div className="min-h-fit w-full max-w-[1440px] mx-auto bg-black relative overflow-hidden">
          {/* Wave-like border effect */}
          <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-bl from-purple-900/20"></div>
          <div className="max-w-[1200px] mx-auto py-10 md:py-20">
            <div className="mb-8 md:mb-16 px-4">
              <h1 className="text-white text-2xl md:text-4xl font-bold mb-4 md:mb-6">
                Navigating the Estatein Experience
              </h1>
              <p className="text-gray-300 text-base md:text-lg">
                At Estatein, we have designed a straightforward process to help you
                find and purchase your dream property with ease. Here is a
                step-by-step guide to how it all works.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4">
              {steps.map((item) => (
                <div
                  key={item.step}
                  className="relative group cursor-pointer transition-all duration-300"
                >
                  {/* Purple accent line */}
                  <div className="h-1 w-16 bg-purple-600 mb-6"></div>
                  {/* Content */}
                  <div className="space-y-4">
                    <span className="text-gray-400 text-sm">Step {item.step}</span>
                    <h3 className="text-white text-lg md:text-xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg -z-10"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
};

export default Feature4;

