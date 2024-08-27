import BackLink from '@/components/blocks/back-link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import api from '@/lib/api';
import { getAuth } from '@/lib/auth';
import { GetListByIdResponseDto } from '@/lib/dto';
import { EllipsisVertical, FlagIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import DeleteButton from './_components/delete-button';
import Items from './_components/items';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
  const user = await getAuth();
  const belongsToCurrentUser = list.userId === user?.data.id;

  return (
    <div>
      <div className="flex items-end justify-between">
        <div className="flex flex-col justify-start">
          <BackLink href="/lists" />
          <h2 className="text-2xl font-semibold tracking-tight">
            {list.title}
          </h2>
        </div>

        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="block"
            >
              <Button
                className="block"
                variant="ghost"
              >
                <EllipsisVertical className="size-6" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="mr-4 w-32 space-y-2 p-2"
              align="end"
            >
              <DropdownMenuItem className="cursor-pointer p-0">
                <Button
                  className="flex w-full justify-start hover:no-underline"
                  variant="link"
                  size="sm"
                  asChild
                >
                  <Link href={`/report?id=${id}&type=list`}>
                    <FlagIcon className="mr-2 size-4" />
                    Report
                  </Link>
                </Button>
              </DropdownMenuItem>
              {belongsToCurrentUser && (
                <DialogTrigger asChild>
                  <DropdownMenuItem className="cursor-pointer p-0">
                    <Button
                      className="flex w-full justify-start text-destructive hover:no-underline"
                      variant="link"
                      size="sm"
                      type="button"
                    >
                      <TrashIcon className="mr-2 size-4" />
                      Delete
                    </Button>
                  </DropdownMenuItem>
                </DialogTrigger>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. Are you sure you want to
                permanently delete this list?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DeleteButton listId={id} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <hr className="my-2" />
      <div className="my-16">
        <Items items={list.items} />
      </div>
    </div>
  );
}
