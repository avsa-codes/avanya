import Container from '@/components/layout/Container';

import CauseSelector from './CauseSelector';
import CauseSpotlight from './CauseSpotlight';

export default function ShopByCauseSection() {
  return (
    <section className="py-6 sm:py-8">
      <Container>
        <div className="mb-5 grid items-center gap-4 lg:grid-cols-[0.9fr_2fr] lg:gap-8">
          <div>
            <h2 className="font-display text-3xl font-semibold leading-tight text-text sm:text-4xl">
              Shop by Cause
            </h2>
            <p className="mt-1 text-sm leading-5 text-text/65 sm:text-base">
              Every purchase supports a bigger purpose.
            </p>
          </div>

          <CauseSelector />
        </div>

        <CauseSpotlight />
      </Container>
    </section>
  );
}
