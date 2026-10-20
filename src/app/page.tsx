import HeroSection from "./_components/HeroSection";
import TrustStrip from "./_components/TrustStrip";
import CategorySection from "./_components/CategorySection";
import FeaturedProducts from "./_components/FeaturedProducts";
import ShopByCauseSection from "./_components/ShopByCauseSection";
import SwipeModeBanner from "./_components/SwipeModeBanner";
import CorporateGiftingBanner from "./_components/CorporateGiftingBanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <CategorySection />
      <FeaturedProducts />
      <ShopByCauseSection />
      <SwipeModeBanner />
      <CorporateGiftingBanner />
    </>
  );
}
