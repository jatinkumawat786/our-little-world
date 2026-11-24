import React from 'react';
import { useLove } from '../context/LoveContext';

export default function CelebrationBurst() {
  const { bursts } = useLove();
  if (!bursts.length) return null;

  return (
    <div className="burst-layer" aria-hidden="true">
      {bursts.map((burst) =>
        burst.particles.map((p) => (
          <span
            key={p.key}
            className="burst-particle"
            style={{
              '--tx': p.tx,
              '--ty': p.ty,
              '--rot': p.rot,
            }}
          >
            {p.symbol}
          </span>
        ))
      )}
    </div>
  );
}
