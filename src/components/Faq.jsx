import Stars from '../assets/Abstract Design.png';
export default function FAQ() {
    const faqs = [
        {
            question: "How can I search for available properties??",
            answer: "Simply use our search bar to filter properties by location, price range, and property type. You can also browse through our featured listings."
        },
        {
            question: "Do I need to pay before scheduling a property visit?",
            answer: "No, scheduling a property visit is completely free. Our agents will guide you through the process before any payment is required."
        },
        {
            question: "What documents do I need to buy a property?",
            answer: "To purchase a property, you will need a valid ID, proof of income, bank statements, and other documents which our agents will guide you through."
        },
        {
            question: "How can I contact customer support?",
            answer: "You can reach out to our customer support team through the Contact Us page or by sending an email to support@estatein.com."
        }
    ];

    return (
        <section className="py-10 bg-[#141414] sm:py-16 lg:py-24 rounded-2xl">
            <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
            <div>
                <img src={Stars} alt="" />
            </div>
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
                    <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-300">
                     Find answers to common questions about Estatein services, property listings, and the real estate process. We are here to provide clarity and assist you every step of the way.
                    </p>
                </div>

                <div className="grid grid-cols-1 mt-12 md:mt-20 md:grid-cols-2 gap-y-16 gap-x-20">
                    {faqs.map((faq, index) => (
                        <div key={index} className="flex items-start">
                            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
                                <span className="text-lg font-semibold text-white">?</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-xl font-semibold text-white">{faq.question}</p>
                                <p className="mt-4 text-base text-gray-400">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-center mt-12 md:mt-20">
                    <div className="px-8 py-4 text-center bg-gray-800 rounded-full">
                        <p className="text-gray-50">
                            Didn’t find the answer you are looking for?{' '}
                            <a href="#" className="text-purple-400 transition-all duration-200 hover:text-purple-500 focus:text-yellow-400 hover:underline">
                                Contact our support
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
