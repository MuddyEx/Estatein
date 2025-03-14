import Stars from '../assets/Abstract Design.png'
export default function HowItWorks() {
    const steps = [
        {
            number: '1',
            title: 'Discover Your Dream Apartments',
            description: 'Browse through our curated selection of top-tier apartments tailored to your needs and preferences.'
        },
        {
            number: '2',
            title: 'Schedule a Viewing',
            description: 'Book an appointment with our expert agents to explore the property in person or via virtual tours.'
        },
        {
            number: '3',
            title: 'Secure Your Deal',
            description: 'Seal the deal with our hassle-free purchasing process and move into your dream apartment.'
        }
    ];

    return (
        <section className=" py-10  sm:py-16 lg:py-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className='mb-8'>
                    <img src={Stars} alt="" />
                </div>
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">How does it work?</h2>
                    <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-200">
                      Your Journey to Finding the Perfect Property, Made Simple.
                    </p>
                </div>

                <div className="relative mt-12 lg:mt-20">
                    <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                        {steps.map((step, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gray-600 border-2 border-gray-200 rounded-full shadow">
                                    <span className="text-xl font-semibold text-white">{step.number}</span>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold leading-tight text-white md:mt-10">{step.title}</h3>
                                <p className="mt-4 text-base text-gray-200">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
