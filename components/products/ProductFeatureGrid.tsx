import { ProductFeatureCard } from './ProductFeatureCard';
import type { ProductFeature } from '@/types';

interface ProductFeatureGridProps {
  features: ProductFeature[];
}

export function ProductFeatureGrid({ features }: ProductFeatureGridProps) {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <ProductFeatureCard
          key={feature.id}
          feature={feature}
          index={index}
        />
      ))}
    </div>
  );
}
