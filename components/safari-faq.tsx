"use client"

import { useState } from "react"

export function SafariFAQ() {
  const [openItem, setOpenItem] = useState<number | null>(0)

  const faqs = [
    {
      question: "What is the best time of year for a safari in East Africa?",
      answer:
        "The best time for a safari in East Africa (Kenya and Tanzania) is during the dry seasons: January to March and June to October. These periods offer excellent wildlife viewing as animals gather around water sources. The Great Migration in the Serengeti and Maasai Mara is best witnessed from July to October.",
    },
    {
      question: "How much does an African safari typically cost?",
      answer:
        "Safari costs vary widely depending on the destination, accommodation type, and duration. Budget safaris can start from $150-$200 per person per day, mid-range options from $350-$600, and luxury safaris from $750-$1,500+ per day. These prices typically include accommodation, meals, game drives, and park fees.",
    },
    {
      question: "Is it safe to go on a self-drive safari?",
      answer:
        "Self-drive safaris can be safe in countries like South Africa, Namibia, and parts of Botswana if you're well-prepared. You should have a suitable 4x4 vehicle, GPS, detailed maps, and follow park rules. For first-time safari-goers or in more remote areas, guided safaris are recommended for safety and to benefit from guides' expertise.",
    },
    {
      question: "What should I pack for a safari?",
      answer:
        "Essential items include neutral-colored clothing (beige, khaki, olive), layers for temperature changes, a wide-brimmed hat, sunglasses, sunscreen, insect repellent, comfortable walking shoes, a light rain jacket, binoculars, camera with zoom lens, and any necessary medications. Avoid bright colors and pack light, as small aircraft and safari vehicles have luggage restrictions.",
    },
    {
      question: "Do I need vaccinations before going on safari?",
      answer:
        "Yes, several vaccinations are recommended or required for African safaris. These typically include Yellow Fever (required for entry to some countries), Hepatitis A and B, Typhoid, Tetanus, and Malaria prophylaxis. Consult with a travel medicine specialist at least 6-8 weeks before your trip for the most current recommendations based on your specific destinations.",
    },
  ]

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-500">
            Get answers to common questions about safari experiences in Africa
          </p>
        </div>
        <div className="mt-12 mx-auto max-w-3xl">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                className="flex w-full items-center justify-between py-6 text-left"
                onClick={() => setOpenItem(openItem === index ? null : index)}
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                <span className="ml-6 flex-shrink-0">
                  {openItem === index ? (
                    <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </span>
              </button>
              {openItem === index && (
                <div className="pb-6">
                  <p className="text-base text-gray-500">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
