import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: '#3A7667',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Wave shape simplified */}
        <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
          <path
            d="M1 10 C4 4, 8 2, 11 6 C14 10, 18 8, 21 4"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M1 7 C4 1, 9 -1, 11 3"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
