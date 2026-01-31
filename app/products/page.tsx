'use client';

import { ProductHero } from '@/components/products/ProductHero';
import { ProductFeatureGrid } from '@/components/products/ProductFeatureGrid';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard';
import { CTAButton } from '@/components/ui/CTAButton';
import { Footer } from '@/components/layout/Footer';
import { PRODUCT_FEATURES, PRODUCT_INFO } from '@/data/products';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-900 pt-20">
      {/* Product Hero */}
      <ProductHero
        title={PRODUCT_INFO.title}
        subtitle={PRODUCT_INFO.subtitle}
        ctaText={PRODUCT_INFO.ctaText}
        ctaLink={PRODUCT_INFO.ctaLink}
      />

      {/* Features Grid */}
      <section className="py-20 px-4">
        <SectionHeader>מה כלול בחבילה?</SectionHeader>
        <ProductFeatureGrid features={PRODUCT_FEATURES} />
      </section>

      {/* Pricing/CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <GlassmorphicCard blur="xl" className="text-center p-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-orci-cyan to-orci-blue">
                מוכנים להתחיל?
              </span>
            </h3>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              שלחו לי הודעה ונתחיל לבנות את הנוכחות הדיגיטלית שלכם.
              <br />
              אני כאן כדי לעזור לכם להצליח.
            </p>
            <CTAButton href="https://wa.me/972542599107" variant="primary" size="lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              בואו נדבר
            </CTAButton>
          </GlassmorphicCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}
