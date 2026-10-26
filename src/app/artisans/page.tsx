'use client';

import { useState } from 'react';
import ArtisanProfiles from './_components/ArtisanProfiles';
import NGOProfiles from './_components/NGOProfiles';

export default function ArtisansPage() {
  const [activeTab, setActiveTab] = useState<'artisans' | 'ngos'>('artisans');
  const [search, setSearch] = useState('');

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#8B2625]">
              People behind every creation
            </p>

            <h1 className="font-serif text-4xl text-[#1A1817] sm:text-5xl">
              Artisans &amp; NGOs
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
              Meet the artisans preserving traditional crafts and the
              organizations empowering their communities.
            </p>
          </div>

          <div className="flex w-fit rounded-xl bg-white p-1 shadow-sm ring-1 ring-black/5">
            <button
              type="button"
              onClick={() => setActiveTab('artisans')}
              className={`rounded-lg px-5 py-2.5 text-sm font-medium transition ${
                activeTab === 'artisans'
                  ? 'bg-[#8B2625] text-white'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              Artisans
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ngos')}
              className={`rounded-lg px-5 py-2.5 text-sm font-medium transition ${
                activeTab === 'ngos'
                  ? 'bg-[#8B2625] text-white'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              NGOs
            </button>
          </div>
        </div>

        <div className="mt-8">
          <label htmlFor="profile-search" className="sr-only">
            Search artisans and NGOs
          </label>

          <input
            id="profile-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={
              activeTab === 'artisans'
                ? 'Search artisans, crafts, locations...'
                : 'Search NGOs, causes, locations...'
            }
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-[#1A1817] outline-none transition placeholder:text-stone-400 focus:border-[#8B2625] focus:ring-2 focus:ring-[#8B2625]/10 sm:max-w-md"
          />
        </div>

        <div className="mt-8">
          {activeTab === 'artisans' ? <ArtisanProfiles /> : <NGOProfiles />}
        </div>
      </section>
    </main>
  );
}
