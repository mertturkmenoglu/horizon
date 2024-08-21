import FormattedRating from '@/components/blocks/formatted-rating';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { HServiceResponseDto } from '@/lib/dto';
import { formatDeliveryTimespan, formatPriceTimespan } from '@/lib/timespan';

type Props = {
  hservice: HServiceResponseDto;
};

export default function InformationTable({ hservice }: Props) {
  function calculateRating() {
    if (hservice.totalVotes === 0) return 0;
    return hservice.totalPoints / hservice.totalVotes;
  }

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className="px-0 font-medium">Rating</TableCell>
          <TableCell className="flex items-center justify-end">
            <FormattedRating
              rating={calculateRating()}
              votes={hservice.totalVotes}
            />
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="px-0 font-medium">Price</TableCell>
          <TableCell className="text-right">
            {hservice.price} {hservice.priceUnit}{' '}
            {formatPriceTimespan(hservice.priceTimespan)}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="px-0 font-medium">Online</TableCell>
          <TableCell className="text-right">
            {hservice.isOnline ? 'Yes' : 'No'}
          </TableCell>
        </TableRow>

        {hservice.url !== null && (
          <TableRow>
            <TableCell className="px-0 font-medium">URL</TableCell>
            <TableCell className="text-right">
              <a
                href={hservice.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {hservice.url}
              </a>
            </TableCell>
          </TableRow>
        )}

        <TableRow>
          <TableCell className="px-0 font-medium">Location</TableCell>
          <TableCell className="text-right">{hservice.location}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="px-0 font-medium">Delivery</TableCell>
          <TableCell className="text-right">
            {formatDeliveryTimespan(
              hservice.deliveryTimespan,
              hservice.deliveryTime
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
