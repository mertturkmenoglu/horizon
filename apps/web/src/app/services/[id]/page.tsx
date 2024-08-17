import api from '@/lib/api';
import { HServiceResponseDto } from '@/lib/dto';

type Props = {
  params: {
    id: string;
  };
};

async function getServiceById(id: string): Promise<HServiceResponseDto> {
  const res = await api
    .get(`hservices/${id}`)
    .json<{ data: HServiceResponseDto }>();
  return res.data;
}

export default async function Page({ params: { id } }: Props) {
  const data = await getServiceById(id);

  return (
    <div className="container my-16">
      <pre className="text-wrap">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
