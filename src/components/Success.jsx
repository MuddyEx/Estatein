export default function Success() {
    const steps = [
      {
        icon: (
          <svg
            className="w-10 h-10 text-fuchsia-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        ),
        title: "3+ Years of Excellence",
        description: "With over 3 years in the industry, we've amassed a wealth of knowledge and experience."
      },
      {
        icon: (
          <svg
            className="w-10 h-10 text-fuchsia-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
            />
          </svg>
        ),
        title: "Happy Clients",
        description: "Our greatest achievement is the satisfaction of our clients. Their success stories fuel our passion for what we do.."
      },
      {
        icon: (
          <svg
            className="w-10 h-10 text-fuchsia-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        ),
        title: "Industry Recognition",
        description: "We've earned the respect of our peers and industry leaders, with accolades and awards that reflect our commitment to excellence."
      }
    ];
  
    return (
      <section className="py-10 bg-black sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Our Achievements
            </h2>
            <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-300">
            Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary.
            </p>
          </div>
  
          <ul className="max-w-md mx-auto mt-16 space-y-12">
            {steps.map((step, index) => (
              <li key={index} className="relative flex items-start">
                {index < steps.length - 1 && (
                  <div
                    className="-ml-0.5 absolute mt-0.5 top-14 left-8 w-px border-l-4 border-dotted border-gray-300 h-full"
                    aria-hidden="true"
                  ></div>
                )}
                <div className="relative flex items-center justify-center flex-shrink-0 w-16 h-16 bg-white rounded-full shadow">
                  {step.icon}
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-4 text-base text-gray-300">{step.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  } 
  