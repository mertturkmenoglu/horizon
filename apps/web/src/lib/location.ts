import { cn } from './cn';
import { GetMeResponse } from './dto';

type Loc = Pick<GetMeResponse['location'], 'city' | 'country' | 'admin'>;

export function formatLocation({ city, country, admin }: Loc): string {
  return city === '' || country === '' ? '' : cn(city, admin, country);
}
