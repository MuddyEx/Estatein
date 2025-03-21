import { X } from 'lucide-react';
import { useState } from 'react';

export default function Banner() {
    const [visible, setVisible] = useState(true);

    const closeBanner = () => {
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="bg-white  pt-0 sm:pt-1 lg:pt-1">
            <div className="mx-auto max-w-screen-2xl px-4 pb-4 md:px-8">
                <div className="relative flex flex-wrap rounded-lg bg-indigo-500 px-4 py-3 shadow-lg sm:flex-nowrap sm:items-center sm:justify-center sm:gap-3 sm:pr-8 md:px-8">
                    <div className="order-1 mb-2 inline-block w-11/12 max-w-screen-sm text-sm text-white sm:order-none sm:mb-0 sm:w-auto md:text-base">
                        This is a section of some simple filler text, also known as placeholder text.
                    </div>

                    <a href="#" className="order-last inline-block w-full whitespace-nowrap rounded-lg bg-indigo-600 px-4 py-2 text-center text-xs font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-700 focus-visible:ring active:bg-indigo-800 sm:order-none sm:w-auto md:text-sm">
                        Learn more
                    </a>

                    <div className="order-2 flex w-1/12 items-start justify-end sm:absolute sm:right-0 sm:order-none sm:mr-2 sm:w-auto xl:mr-3">
                        <button onClick={closeBanner} className="text-white transition duration-100 hover:text-indigo-100 active:text-indigo-200">
                            <X className="h-5 w-5 xl:h-6 xl:w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
