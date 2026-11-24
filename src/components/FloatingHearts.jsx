import React from 'react';

const HEARTS = [
  { left: '6%', size: 14, dur: '16s', delay: '0s', drift: '22px', char: '♡' },
  { left: '15%', size: 18, dur: '21s', delay: '3s', drift: '-26px', char: '♥' },
  { left: '24%', size: 12, dur: '18s', delay: '7s', drift: '18px', char: '✦' },
  { left: '36%', size: 16, dur: '23s', delay: '2s', drift: '-18px', char: '♡' },
  { left: '49%', size: 14, dur: '19s', delay: '6s', drift: '24px', char: '♥' },
  { left: '62%', size: 18, dur: '22s', delay: '1s', drift: '-22px', char: '♡' },
  { left: '74%', size: 12, dur: '17s', delay: '5s', drift: '20px', char: '✦' },
  { left: '84%', size: 16, dur: '20s', delay: '4s', drift: '-24px', char: '♥' },
  { left: '93%', size: 13, dur: '15s', delay: '8s', drift: '16px', char: '♡' },
];

export default function FloatingHearts() {
  return (
    <div className="ambient-hearts" aria-hidden="true">
      {HEARTS.map((item, idx) => (
        <span
          key={idx}
          className="ambient-heart"
          style={{
            left: item.left,
            fontSize: `${item.size}px`,
            animationDuration: item.dur,
            animationDelay: item.delay,
            '--drift': item.drift,
          }}
        >
          {item.char}
        </span>
      ))}
    </div>
  );
}
