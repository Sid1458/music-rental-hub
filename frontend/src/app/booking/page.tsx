/**
 * Booking Page — Rental booking form with context info.
 */

import BookingForm from "@/components/BookingForm";

export default function BookingPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Book Your <span className="text-gradient">Rental</span>
          </h1>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-lg">
            Fill in the form below to reserve your instrument. Pick your dates
            and duration — we&apos;ll handle the rest.
          </p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form column */}
            <div className="lg:col-span-2">
              <BookingForm />
            </div>

            {/* Info sidebar */}
            <div className="space-y-6">
              {/* Why Rent */}
              <div className="bg-gray-900/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  Why Rent With Us?
                </h3>
                <ul className="space-y-4">
                  {[
                    {
                      icon: "🎸",
                      title: "Premium Quality",
                      desc: "All instruments are professionally maintained and tuned.",
                    },
                    {
                      icon: "💰",
                      title: "Affordable Rates",
                      desc: "Daily and weekly options to fit every budget.",
                    },
                    {
                      icon: "🚚",
                      title: "Free Delivery",
                      desc: "We deliver to your doorstep in select cities.",
                    },
                    {
                      icon: "🛡️",
                      title: "Insured Rentals",
                      desc: "All rentals include basic damage protection.",
                    },
                  ].map((item) => (
                    <li
                      key={item.title}
                      className="flex items-start gap-3"
                    >
                      <span className="text-xl mt-0.5">{item.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Box */}
              <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-6 text-center">
                <p className="text-sm text-gray-400 mb-2">Need help?</p>
                <p className="text-lg font-bold text-white">
                  support@musicrent.com
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Mon–Sat, 9 AM – 6 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
