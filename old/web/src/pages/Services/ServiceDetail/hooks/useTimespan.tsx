const timespanToText: Record<number, string> = {
  0: 'Hour',
  1: 'Day',
  2: 'Week',
  3: 'Month',
};

export function useTimespan(ts: number) {
  return timespanToText[ts] ?? 'Hour';
}
