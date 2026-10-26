'use client';

import { useState } from 'react';
import Link from 'next/link';

type Section = 'overview' | 'orders' | 'addresses' | 'wishlist' | 'settings';

const navigation: { id: Section; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: '⌂' },
  { id: 'orders', label: 'My Orders', icon: '▤' },
  { id: 'addresses', label: 'Addresses', icon: '⌖' },
  { id: 'wishlist', label: 'Wishlist', icon: '♡' },
  { id: 'settings', label: 'Profile Settings', icon: '⚙' },
];

const orders = [
  {
    id: 'AV-2026-0012',
    date: '18 Oct 2026',
    item: 'Handcrafted Everyday Tote',
    amount: '₹799',
    status: 'Delivered',
  },
  {
    id: 'AV-2026-0008',
    date: '09 Oct 2026',
    item: 'Handmade Ceramic Mug',
    amount: '₹549',
    status: 'In transit',
  },
];

export default function AccountPage() {
  const [activeSection, setActiveSection] = useState<Section>('overview');

  return (
    <main className="min-h-screen bg-[#FAF8F2] text-[#211C18]">
      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8B2625]">
            Your Avanya
          </p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Your account,{' '}
            <span className="italic text-[#8B2625]">your story.</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6F655B] sm:text-base">
            Keep track of your orders, manage your details, and revisit the
            things you love.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="h-fit border border-[#E7DED3] bg-white p-5">
            <div className="flex items-center gap-3 border-b border-[#EAE2D8] pb-5">
              <div className="flex size-12 items-center justify-center rounded-full bg-[#8B2625] font-serif text-xl text-white">
                A
              </div>
              <div className="min-w-0">
                <p className="font-serif text-lg">Avanya Customer</p>
                <p className="truncate text-xs text-stone-500">
                  Welcome to your account
                </p>
              </div>
            </div>

            <nav aria-label="Account navigation" className="mt-4 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                  className={`flex w-full items-center gap-3 px-3 py-3 text-left text-sm transition-colors ${
                    activeSection === item.id
                      ? 'bg-[#8B2625] text-white'
                      : 'text-[#62574D] hover:bg-[#F5F0E8]'
                  }`}
                >
                  <span className="w-5 text-center text-lg" aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
            </nav>

            <Link
              href="/marketplace"
              className="mt-5 block border-t border-[#EAE2D8] pt-5 text-sm text-[#8B2625] hover:underline"
            >
              ← Continue shopping
            </Link>
          </aside>

          <div className="min-w-0">
            {activeSection === 'overview' && (
              <div className="space-y-8">
                <section className="border border-[#E7DED3] bg-white p-6 sm:p-8">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#9A5144]">
                    Account overview
                  </p>
                  <h2 className="mt-2 font-serif text-3xl">Welcome back.</h2>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    Your purchases help keep traditional craftsmanship alive.
                    Thank you for being part of the journey.
                  </p>

                  <div className="mt-7 grid gap-4 sm:grid-cols-3">
                    {[
                      { label: 'Total orders', value: '02' },
                      { label: 'Wishlist items', value: '04' },
                      { label: 'Addresses saved', value: '01' },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="border border-[#EAE2D8] bg-[#FAF8F2] p-4"
                      >
                        <p className="text-xs text-stone-500">{stat.label}</p>
                        <p className="mt-2 font-serif text-3xl text-[#8B2625]">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="mb-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#9A5144]">
                        Your purchases
                      </p>
                      <h2 className="mt-2 font-serif text-3xl">
                        Recent orders
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveSection('orders')}
                      className="text-sm text-[#8B2625] hover:underline"
                    >
                      View all
                    </button>
                  </div>

                  <div className="border border-[#E7DED3] bg-white">
                    {orders.map((order, index) => (
                      <article
                        key={order.id}
                        className={`p-5 sm:p-6 ${
                          index > 0 ? 'border-t border-[#EAE2D8]' : ''
                        }`}
                      >
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                          <div>
                            <p className="text-xs text-stone-500">
                              Order {order.id}
                            </p>
                            <h3 className="mt-2 font-medium">{order.item}</h3>
                            <p className="mt-1 text-xs text-stone-500">
                              Placed {order.date}
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                            <span
                              className={`text-xs ${
                                order.status === 'Delivered'
                                  ? 'text-[#2E6B4F]'
                                  : 'text-[#9A6724]'
                              }`}
                            >
                              {order.status}
                            </span>
                            <span className="font-medium">{order.amount}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="grid gap-5 md:grid-cols-2">
                  <div className="border border-[#E7DED3] bg-white p-6">
                    <p className="text-xs uppercase tracking-[0.16em] text-[#9A5144]">
                      Personal details
                    </p>
                    <h2 className="mt-2 font-serif text-2xl">Your profile</h2>
                    <p className="mt-4 text-sm">Avanya Customer</p>
                    <p className="mt-1 text-sm text-stone-500">
                      customer@example.com
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveSection('settings')}
                      className="mt-5 text-sm text-[#8B2625] hover:underline"
                    >
                      Manage profile →
                    </button>
                  </div>

                  <div className="border border-[#E7DED3] bg-white p-6">
                    <p className="text-xs uppercase tracking-[0.16em] text-[#9A5144]">
                      Delivery
                    </p>
                    <h2 className="mt-2 font-serif text-2xl">Saved address</h2>
                    <p className="mt-4 text-sm">Home address</p>
                    <p className="mt-1 text-sm leading-6 text-stone-500">
                      Add your delivery address to make checkout easier.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveSection('addresses')}
                      className="mt-5 text-sm text-[#8B2625] hover:underline"
                    >
                      Manage addresses →
                    </button>
                  </div>
                </section>
              </div>
            )}

            {activeSection === 'orders' && (
              <section>
                <p className="text-xs uppercase tracking-[0.18em] text-[#9A5144]">
                  Your purchases
                </p>
                <h2 className="mt-2 font-serif text-4xl">My orders</h2>
                <div className="mt-6 border border-[#E7DED3] bg-white">
                  {orders.map((order) => (
                    <article
                      key={order.id}
                      className="flex flex-col justify-between gap-4 border-b border-[#EAE2D8] p-5 last:border-b-0 sm:flex-row sm:items-center"
                    >
                      <div>
                        <p className="text-xs text-stone-500">{order.id}</p>
                        <h3 className="mt-2 font-medium">{order.item}</h3>
                        <p className="mt-1 text-xs text-stone-500">
                          {order.date}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                        <span className="text-sm">{order.status}</span>
                        <span className="font-medium">{order.amount}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {activeSection === 'addresses' && (
              <section className="border border-[#E7DED3] bg-white p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-[#9A5144]">
                  Delivery details
                </p>
                <h2 className="mt-2 font-serif text-4xl">Saved addresses</h2>
                <p className="mt-4 max-w-lg text-sm leading-6 text-stone-600">
                  Your saved delivery addresses will appear here. You will be
                  able to add, edit, and select an address during checkout once
                  account functionality is connected.
                </p>
                <p className="mt-6 border border-dashed border-[#D8CBBE] p-5 text-sm text-stone-500">
                  No connected addresses yet.
                </p>
              </section>
            )}

            {activeSection === 'wishlist' && (
              <section className="border border-[#E7DED3] bg-white p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-[#9A5144]">
                  Saved for later
                </p>
                <h2 className="mt-2 font-serif text-4xl">Your wishlist</h2>
                <p className="mt-4 max-w-lg text-sm leading-6 text-stone-600">
                  Keep the handcrafted pieces you love in one place. Your saved
                  products will appear here when wishlist functionality is
                  connected.
                </p>
                <Link
                  href="/marketplace"
                  className="mt-6 inline-block bg-[#8B2625] px-5 py-3 text-sm text-white hover:bg-[#721E1D]"
                >
                  Explore the marketplace
                </Link>
              </section>
            )}

            {activeSection === 'settings' && (
              <section className="border border-[#E7DED3] bg-white p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-[#9A5144]">
                  Your information
                </p>
                <h2 className="mt-2 font-serif text-4xl">Profile settings</h2>
                <p className="mt-4 max-w-lg text-sm leading-6 text-stone-600">
                  Your name, email, phone number, and account preferences will
                  be editable here once authentication and the user database are
                  implemented.
                </p>
                <p className="mt-6 border border-dashed border-[#D8CBBE] p-5 text-sm text-stone-500">
                  Profile editing will be available when your account is
                  connected.
                </p>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
