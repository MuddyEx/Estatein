import { Link } from "react-router-dom";
import SideImg from "../assets/About-hero.png";
import Logo from '../assets/Logo.png'

const UserRegister = () => {
   
    return (
      <section className="bg-black">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-center px-4 py-10 bg-black sm:px-6 lg:px-8 sm:py-16 lg:py-24">
            {/* HEADER */}
            <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
              <img className="h-10 mb-3" src={Logo} alt="" />
              <p className="mt-2 text-base text-gray-300">
                Signup as an Agent?{" "}
                <Link to="/agent/register"
                  className="font-medium text-purple-700 transition-all duration-200 hover:text-purple-800 hover:underline focus:text-purple-900"
                >
                  Signup
                </Link>
              </p>
                {/* FORM */}
              <form action="#" method="POST" className="mt-8">
                
                <div className="space-y-5">
                    {/* FULL - NAME */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 ">
                      Full Name
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="block w-full p-3 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-purple-600 focus:bg-white caret-purple-600"
                      />
                    </div>
                  </div>


                    {/* EMAIL */}
                  <div>
                    <label className="text-sm font-medium text-gray-300">
                      Email address
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="email"
                        placeholder="Enter email"
                        className="block w-full p-3 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-purple-600 focus:bg-white caret-purple-600"
                      />
                    </div>
                  </div>

                    {/* PASSWORD */}
                  <div>
                    <label className="text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="password"
                        placeholder="Enter your password"
                        className="block w-full p-3 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-purple-600 focus:bg-white caret-purple-600"
                      />
                    </div>
                  </div>

                    {/* CHECK BOX */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="agree"
                      className="w-3 h-3 text-purple-600 bg-white border-gray-200 rounded"
                    />
                    <label
                      htmlFor="agree"
                      className="ml-3 text-sm font-medium text-gray-300"
                    >
                      I agree to Estatein’s{" "}
                      <a
                        href="#"
                        className="text-purple-800 hover:text-purple-900 hover:underline"
                      >
                        Terms & Conditions
                      </a>{" "}
                     
                    </label>
                  </div>

                    {/* REGISTER BUTTON */}
                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-purple-800 border border-transparent rounded-md focus:outline-none hover:bg-purple-900 focus:bg-purple-950"
                    >
                      Create account
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-3 space-y-3">
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                >
                  <div className="absolute inset-y-0 left-0 p-4">
                  <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                        <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                        <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                    </svg>
                  </div>
                  Sign up with Google
                </button>

             

                <p className="mt-2 text-center text-base text-gray-300">
                  Already have an account?{" "}
                  <Link to="/user/login"
                    className="font-medium text-purple-700 transition-all duration-200 hover:text-purple-800 hover:underline focus:text-purple-900"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-black sm:px-6 lg:px-8">
            <div>
              <img className="w-full mx-auto" src={SideImg} alt="" />
              <div className="w-full max-w-md mx-auto xl:max-w-xl">
                <h3 className="text-2xl pt-2 font-bold text-center text-white">
                  Discover Your New Home
                </h3>
                <p className="leading-relaxed text-center text-gray-300 mt-2.5">
                Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams.
                </p>

                <div className="flex items-center justify-center mt-10 space-x-3">
                  <div className="bg-purple-500 rounded-full w-20 h-1.5"></div>
                  <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>
                  <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default UserRegister;
  