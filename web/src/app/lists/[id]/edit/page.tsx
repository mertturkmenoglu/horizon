import BackLink from '@/components/blocks/back-link';
import { Separator } from '@/components/ui/separator';
import api from '@/lib/api';
import { GetListByIdResponseDto } from '@/lib/dto';
import Form from './_components/form';

type Props = {
  params: {
    id: string;
  };
};

async function getList(id: string) {
  const res = await api
    .get(`lists/${id}`)
    .json<{ data: GetListByIdResponseDto }>();
  return res.data;
}

export default async function Page({ params: { id } }: Readonly<Props>) {
  const list = await getList(id);

  return (
    <div>
      <div>
        <BackLink href={`/lists/${id}`} />

        <h2 className="text-3xl font-medium tracking-tight lg:text-4xl">
          Edit List
        </h2>

        <Separator className="my-2" />

        <Form list={list} />
      </div>
    </div>
  );
}
