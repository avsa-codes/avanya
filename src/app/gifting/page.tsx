import Image from 'next/image';
import Link from 'next/link';

const benefits = [
  {
    icon: '♧',
    title: 'Creates Real Impact',
    description: 'Your gifts directly support artisans and NGO communities.',
  },
  {
    icon: '◇',
    title: 'Unique & Meaningful',
    description: 'Handcrafted products with cultural and social value.',
  },
  {
    icon: '✳',
    title: 'Customisable Solutions',
    description:
      'Personalisation, branding and curated hampers for every occasion.',
  },
  {
    icon: '♧',
    title: 'Sustainable Choices',
    description: 'Thoughtfully made gifts from artisan communities.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Send an Enquiry',
    description: 'Tell us your requirements, occasion and budget.',
  },
  {
    number: '02',
    title: 'Get a Custom Proposal',
    description: 'We curate product options tailored to your needs.',
  },
  {
    number: '03',
    title: 'Approve & Personalise',
    description: 'Choose your products, branding and packaging.',
  },
  {
    number: '04',
    title: 'We Deliver',
    description: 'We handle production and delivery to your location.',
  },
];

export default function GiftingPage() {
  return (
    <main className="w-full min-w-0 overflow-x-clip bg-[#FAF8F2] text-[#211C18]">
      {/* Hero */}
      <section className="relative isolate min-h-[460px] overflow-hidden md:min-h-[500px]">
        <Image
          src="/images/gifting-hero.png"
          alt="Avanya's handcrafted corporate gift collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/10" />

        <div className="relative mx-auto flex min-h-[460px] w-full max-w-7xl items-center px-6 py-12 md:min-h-[500px] md:px-12 md:py-14">
          <div className="max-w-2xl text-white">
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#E6C9A5]">
              Corporate Gifting
            </p>

            <h1 className="max-w-[780px] font-serif text-4xl leading-[1.08] md:text-5xl lg:text-6xl">
              Meaningful Gifts
              <br />
              for a More Inclusive
              <br />
              Tomorrow
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-white/90 md:text-lg">
              Thoughtfully curated, handcrafted gifts that empower artisans and
              NGO communities across India.
            </p>

            <Link
              href="#enquiry"
              className="mt-6 inline-flex items-center gap-3 rounded-sm bg-[#8B2625] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#6F1D1D]"
            >
              Enquire Now <span aria-hidden="true">→</span>
            </Link>

            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-x-5 gap-y-4 text-xs sm:grid-cols-4 md:text-sm">
              {[
                'Handcrafted & Ethical',
                'Supports Artisans & NGOs',
                'Customisable for Your Brand',
                'Pan India Delivery',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="text-xl text-[#E6C9A5]" aria-hidden="true">
                    ✧
                  </span>
                  <span className="leading-5">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Avanya */}
      <section className="mx-auto grid w-full max-w-7xl items-center gap-8 px-6 py-10 md:grid-cols-2 md:gap-9 md:px-12 md:py-12">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
          <Image
            src="/images/gifting-collection.png"
            alt="A selection of artisan-made gift products"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#8B2625]">
            Thoughtful by nature
          </p>

          <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight md:text-4xl">
            Why Choose Avanya
            <br className="hidden md:block" /> for Corporate Gifting?
          </h2>

          <div className="mb-8 mt-5 h-px w-12 bg-[#8B2625]" />

          <div className="grid gap-7 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#F0E6D9] text-2xl text-[#8B2625]">
                  {benefit.icon}
                </div>

                <div>
                  <h3 className="font-serif text-xl leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#625A52]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-[#E9E0D4] bg-[#F5F0E8] px-6 py-10 md:px-12 md:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-[#8B2625]">
              Our process
            </p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">
              How It Works
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-[#8B2625]" />
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#625A52]">
              From your brief to beautifully crafted gifts, we make corporate
              gifting simple, thoughtful and impactful.
            </p>
          </div>

          <div className="mt-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#EDE0D0] font-serif text-2xl text-[#8B2625]">
                  {step.number}
                </div>
                <h3 className="mt-5 font-serif text-xl">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#625A52]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry */}

      {/* Enquiry */}
      <section
        id="enquiry"
        className="scroll-mt-28 bg-[#FAF8F2] text-[#2D2926]"
      >
        <div className="grid w-full grid-cols-1 items-stretch md:grid-cols-2">
          {/* Form Column */}
          <div className="flex flex-col justify-center min-w-0 px-6 py-10 sm:px-10 md:px-12 lg:px-16 xl:px-20">
            {/* Main Title */}
            <h2 className="font-serif text-3xl font-medium tracking-tight text-[#2B231F] sm:text-4xl lg:text-[40px] leading-tight">
              Enquire for Corporate Gifting
            </h2>

            {/* Red Accent Divider */}
            <div className="mt-4 h-[2px] w-10 bg-[#8B2625]" />

            {/* Description Text */}
            <p className="mt-4 max-w-lg text-sm text-[#5C544D] leading-relaxed">
              Share your requirements and our team will get back to you with a
              customised proposal.
            </p>

            {/* Form */}
            <form
              action="mailto:hello@avanya.in"
              method="post"
              encType="text/plain"
              className="mt-6 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2"
            >
              <input
                required
                name="name"
                placeholder="Your Name *"
                aria-label="Your name"
                className="h-12 min-w-0 w-full rounded-md border border-[#E3DACD] bg-[#F7F5EE] px-3.5 text-sm outline-none transition placeholder:text-[#8C827A] focus:border-[#8B2625] focus:bg-white"
              />

              <input
                required
                name="company"
                placeholder="Company Name *"
                aria-label="Company name"
                className="h-12 min-w-0 w-full rounded-md border border-[#E3DACD] bg-[#F7F5EE] px-3.5 text-sm outline-none transition placeholder:text-[#8C827A] focus:border-[#8B2625] focus:bg-white"
              />

              <input
                required
                type="email"
                name="email"
                placeholder="Work Email *"
                aria-label="Work email"
                className="h-12 min-w-0 w-full rounded-md border border-[#E3DACD] bg-[#F7F5EE] px-3.5 text-sm outline-none transition placeholder:text-[#8C827A] focus:border-[#8B2625] focus:bg-white"
              />

              <input
                required
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                aria-label="Phone number"
                className="h-12 min-w-0 w-full rounded-md border border-[#E3DACD] bg-[#F7F5EE] px-3.5 text-sm outline-none transition placeholder:text-[#8C827A] focus:border-[#8B2625] focus:bg-white"
              />

              <select
                required
                name="occasion"
                defaultValue=""
                aria-label="Occasion or purpose"
                className="h-12 min-w-0 w-full rounded-md border border-[#E3DACD] bg-[#F7F5EE] px-3.5 text-sm text-[#8C827A] outline-none transition focus:border-[#8B2625] focus:bg-white"
              >
                <option value="" disabled>
                  Occasion / Purpose *
                </option>
                <option value="onboarding">Employee onboarding</option>
                <option value="festive">Festive gifting</option>
                <option value="appreciation">Client appreciation</option>
                <option value="events">Events and conferences</option>
                <option value="other">Other</option>
              </select>

              <select
                required
                name="quantity"
                defaultValue=""
                aria-label="Estimated quantity"
                className="h-12 min-w-0 w-full rounded-md border border-[#E3DACD] bg-[#F7F5EE] px-3.5 text-sm text-[#8C827A] outline-none transition focus:border-[#8B2625] focus:bg-white"
              >
                <option value="" disabled>
                  Estimated Quantity *
                </option>
                <option value="<50">Under 50</option>
                <option value="50-100">50–100</option>
                <option value="101-500">101–500</option>
                <option value="501-1000">501–1000</option>
                <option value="1000+">1000+</option>
              </select>

              <textarea
                name="requirements"
                rows={3}
                placeholder="Additional Requirements (optional)"
                aria-label="Additional requirements"
                className="min-h-[100px] min-w-0 w-full resize-none rounded-md border border-[#E3DACD] bg-[#F7F5EE] px-3.5 py-3 text-sm outline-none transition placeholder:text-[#8C827A] focus:border-[#8B2625] focus:bg-white sm:col-span-2"
              />

              <div className="pt-2 sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#7D2222] px-6 text-sm font-medium text-white shadow-sm transition hover:bg-[#681C1C] active:scale-[0.99]"
                >
                  Submit Enquiry <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          </div>

          {/* Image Column */}
          <div className="relative min-h-[400px] w-full overflow-hidden md:min-h-[580px]">
            <Image
              src="/images/gifting-box.png"
              alt="A thoughtfully packaged Avanya corporate gift"
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      {/* <section className="relative isolate min-h-[220px] overflow-hidden">
        <Image
          src="/images/gifting-cta.png"
          alt="Traditional artisan textile work"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#24150F]/75" />

        <div className="relative mx-auto flex min-h-[220px] w-full max-w-7xl flex-col justify-center gap-6 px-6 py-10 text-white md:flex-row md:items-center md:justify-between md:px-12 md:py-12">
          <div>
            <h2 className="max-w-4xl font-serif text-3xl leading-tight md:text-4xl">
              Let Your Gifts Create a Bigger Impact
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85 md:text-base">
              Partner with Avanya for thoughtful, handcrafted gifts that
              celebrate people, culture and a more inclusive future.
            </p>
          </div>

          <Link
            href="#enquiry"
            className="inline-flex w-fit shrink-0 items-center gap-3 bg-[#FAF8F2] px-6 py-3.5 text-sm font-medium text-[#211C18] transition hover:bg-white"
          >
            Enquire Now <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section> */}
    </main>
  );
}
