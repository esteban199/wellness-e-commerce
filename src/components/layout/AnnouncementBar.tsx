import Image from 'next/image';

export default function AnnouncementBar() {
  return (
    <div className="relative z-10 bg-black/75 backdrop-blur-sm text-white text-xs text-center py-2.5 px-4 flex items-center justify-center gap-2">
      <Image src="/assets/icon-coupon.svg" alt="" width={16} height={16} className="w-4 h-4 opacity-80" />
      <span>
        Receive{' '}
        <strong className="font-semibold text-white underline">24% discount</strong>{' '}
        on select products. Available from December 15th to 23rd.
      </span>
    </div>
  );
}
