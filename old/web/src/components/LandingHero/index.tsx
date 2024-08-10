import { cn } from '@/lib/cn';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface LandingHeroProps {
  className?: string;
}

function LandingHero({ className }: LandingHeroProps): React.ReactElement {
  const ref1 = useRef<HTMLDivElement | null>(null);
  const ref2 = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation('landing', { keyPrefix: 'hero' });
  const texts = [t('text1'), t('text2')];
  const morphTime = 1.5;
  const cooldownTime = 2.5;
  let textIndex = texts.length - 1;
  let time = new Date();
  let morph = 0;
  let cooldown = cooldownTime;

  function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
    }

    setMorph(fraction);
  }

  function setMorph(fraction: number) {
    if (!ref1.current || !ref2.current) {
      return;
    }
    ref2.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    ref2.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    ref1.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    ref1.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    ref1.current.textContent = texts[textIndex % texts.length];
    ref2.current.textContent = texts[(textIndex + 1) % texts.length];
  }

  function doCooldown() {
    if (!ref1.current || !ref2.current) {
      return;
    }
    morph = 0;

    ref2.current.style.filter = '';
    ref2.current.style.opacity = '100%';

    ref1.current.style.filter = '';
    ref1.current.style.opacity = '0%';
  }

  // Animation loop, which is called every frame.
  const animate = () => {
    requestAnimationFrame(animate);

    const newTime = new Date();
    const shouldIncrementIndex = cooldown > 0;
    const dt = (newTime.getTime() - time.getTime()) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
      if (shouldIncrementIndex) {
        textIndex++;
      }

      doMorph();
    } else {
      doCooldown();
    }
  };

  useEffect(() => {
    if (!ref1.current || !ref2.current) {
      return;
    }

    ref1.current!.textContent = texts[textIndex % texts.length];
    ref2.current!.textContent = texts[(textIndex + 1) % texts.length];
    // Start the animation.
    animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref1, ref2]);

  return (
    <div
      className={cn(
        'absolute w-full max-w-5xl text-8xl text-black antialiased',
        className
      )}
      id="container"
    >
      <div
        id="text-1"
        className="absolute m-auto inline-block w-full select-none text-center"
        ref={ref1}
      >
        {t('text1')}
      </div>
      <div
        id="text-2"
        className="absolute m-auto inline-block w-full select-none text-center"
        ref={ref2}
      >
        {t('text2')}
      </div>

      <svg id="filters">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
									0 1 0 0 0
									0 0 1 0 0
									0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default LandingHero;
