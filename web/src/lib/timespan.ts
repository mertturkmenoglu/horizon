export const WorkTimespanArr = [
  'HOURLY',
  'DAILY',
  'WEEKLY',
  'MONTHLY',
  'YEARLY',
] as const;

export type WorkTimespan = (typeof WorkTimespanArr)[number];

export function formatPriceTimespan(timespan: string) {
  if (timespan === 'HOURLY') {
    return 'per hour';
  } else if (timespan === 'DAILY') {
    return 'per day';
  } else if (timespan === 'WEEKLY') {
    return 'per week';
  } else if (timespan === 'MONTHLY') {
    return 'per month';
  } else if (timespan === 'YEARLY') {
    return 'per year';
  } else {
    return '';
  }
}

export function formatDeliveryTimespan(
  timespan: string,
  deliveryTime?: number
) {
  let str = '';

  if (timespan === 'HOURLY') {
    str = 'Hour';
  } else if (timespan === 'DAILY') {
    str = 'Day';
  } else if (timespan === 'WEEKLY') {
    str = 'Week';
  } else if (timespan === 'MONTHLY') {
    str = 'Month';
  } else if (timespan === 'YEARLY') {
    str = 'Year';
  }

  if (deliveryTime === undefined) {
    return str;
  }

  if (deliveryTime === 1) {
    return `1 ${str}`;
  }

  return `${deliveryTime} ${str}s`;
}
