import { useRef, useState } from 'react';

export function useCategoryNavigation() {
  const [leftScroll, setLeftScroll] = useState(false);
  const [rightScroll, setRightScroll] = useState(false);
  const ref = useRef<HTMLUListElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const left = useRef<HTMLButtonElement | null>(null);
  const right = useRef<HTMLButtonElement | null>(null);

  return {
    leftScroll,
    setLeftScroll,
    rightScroll,
    setRightScroll,
    ref,
    navRef,
    left,
    right,
  };
}
