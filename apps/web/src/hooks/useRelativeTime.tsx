import { useMemo } from 'react';

export function useRelativeTime(
  utcMillis: number
): [number, Intl.RelativeTimeFormatUnit] {
  const diff = utcMillis - new Date().getTime();
  const days = diff / 86_400_000;
  const hours = diff / 3_600_000;
  const minutes = diff / 60_000;
  const secs = diff / 1_000;

  return useMemo(() => {
    if (Math.abs(secs) < 60) {
      return [Math.floor(secs), 'seconds'];
    }

    if (Math.abs(minutes) < 60) {
      return [Math.floor(minutes), 'minutes'];
    }

    if (Math.abs(hours) < 24) {
      return [Math.floor(hours), 'hours'];
    }

    return [Math.floor(days), 'days'];
  }, [secs, minutes, hours, days]);
}
