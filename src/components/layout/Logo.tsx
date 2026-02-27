import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: number;
  href?: string;
  className?: string;
}

export default function Logo({ size = 44, href = '/', className = '' }: LogoProps) {
  const img = (
    <Image
      src="/logo.svg"
      alt="Westcoast Wellness"
      width={size}
      height={size}
      priority
      className={className}
    />
  );

  if (href) {
    return <Link href={href} className="flex-shrink-0">{img}</Link>;
  }

  return img;
}
