import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
}

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= rating ? 'text-amber-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({
  name,
  slug,
  price,
  compareAtPrice,
  image,
  rating = 5,
}: ProductCardProps) {
  const discount = compareAtPrice
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : null;

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link href={`/product/${slug}`} className="relative aspect-square bg-gray-50 overflow-hidden block">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
        />
        {discount && (
          <span className="absolute top-2 left-2 bg-[#3a7667] text-white text-xs font-medium px-2 py-0.5 rounded">
            -{discount}%
          </span>
        )}
      </Link>

      {/* Add to Cart button — inside image area at bottom */}
      <div className="px-3 pt-3 pb-1">
        <button className="w-full border border-[#3a7667] text-[#3a7667] text-xs font-semibold py-2.5 rounded hover:bg-[#3a7667] hover:text-white transition-colors">
          Add to Cart
        </button>
      </div>

      {/* Info */}
      <Link href={`/product/${slug}`} className="px-3 pb-3 flex-1 flex flex-col justify-between">
        <h3 className="text-sm font-medium text-gray-800 leading-tight mt-1 text-center group-hover:text-[#3a7667] transition-colors">
          {name}
        </h3>
        <div className="mt-2 text-center">
          <span className="text-sm font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          {compareAtPrice && (
            <span className="ml-2 text-xs text-gray-400 line-through">
              ${compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>
        <div className="mt-1.5 flex justify-center">
          <StarRating rating={rating} />
        </div>
      </Link>
    </div>
  );
}
