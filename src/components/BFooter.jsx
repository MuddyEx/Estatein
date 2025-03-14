import heroImg from '../assets/Hero-img.png';
export default function BFooter() {
    return (
        <section className="py-10 bg-[#141414] sm:py-16 lg:py-24 rounded-2xl">
            <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="grid items-center md:grid-cols-2 md:gap-x-20 gap-y-10">
                    <div className="relative pl-16 pr-10 sm:pl-6 md:pl-0 xl:pr-0 md:order-2">
                        <img className="absolute top-6 -right-4 xl:-right-12" src="https://cdn.rareblocks.xyz/collection/celebration/images/features/3/dots-pattern.svg" alt="Dots Pattern" />

                        <div className="relative max-w-xs ml-auto">
                            <div className="overflow-hidden aspect-w-3 aspect-h-4">
                                <img className="object-conatin w-full h-100 " src={heroImg} alt="Man and Woman Discussing" />
                            </div>

                            <div className="absolute bottom-0 -left-16">
                                <div className="bg-[#703BF7]">
                                    <div className="py-4 pl-4 pr-10 sm:py-6 sm:pl-8 sm:pr-16">
                                        <svg className="w-9 sm:w-14 h-9 sm:h-14" xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        <span className="block mt-3 text-xl font-bold text-black sm:mt-6 sm:text-4xl lg:text-5xl"> 2,984 </span>
                                        <span className="block mt-2 text-sm font-medium leading-snug text-white sm:text-base"> Active Customers </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:order-1">
                        <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Start Your Real Estate Journey Today</h2>
                        <p className="mt-4 text-base leading-relaxed text-gray-500">Your dream property is just a click away. Whether you are looking for a new home, a strategic investment, or expert real estate advice, Estatein is here to assist you every step of the way. Take the first step towards your real estate goals and explore our available properties or get in touch with our team for personalized assistance.</p>

                        <a href="#" className="inline-flex items-center justify-center px-8 py-3 mt-8 text-base font-semibold text-white transition-all duration-200 bg-[#703BF7] rounded-md hover:bg-purple-500 focus:bg-purple-700" role="button"> Start exploring </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
