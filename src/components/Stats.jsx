export default function Stats() {
  const stats = [
    { number: '200+', label: 'Happy Customers' },
    { number: '10k+', label: 'Properties For Clients' },
  ];

  return (
    <div className="py-6 sm:py-8 lg:py-8 ">
        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-3 sm:grid-cols-2 sm:gap-1">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center rounded-lg shadow-md shadow-[#1A1A1A]   bg-[#1A1A1A] p-4 md:p-2 w-full">
              <div className="text-xl font-bold text-white sm:text-2xl md:text-2xl">
                {stat.number}
              </div>
              <div className="text-sm text-[#999999] font-semibold sm:text-base">
                {stat.label}
              </div>
            </div>
          ))}
          <div className="flex flex-col items-center justify-center rounded-lg shadow-md shadow-[#1A1A1A]   bg-[#1A1A1A] p-4 md:p-4 w-full col-span-2 sm:col-span-1">
            <div className="text-xl font-bold text-white sm:text-2xl md:text-2xl">
            16+
            </div>
            <div className="text-sm text-[#999999] font-semibold sm:text-base">
            Years of Experience
            </div>
          </div>
        </div>
    </div>
  );
}
