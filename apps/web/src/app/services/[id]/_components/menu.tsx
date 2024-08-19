'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
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
import { AuthContext } from '@/providers/auth';
import { useQuery } from '@tanstack/react-query';
import { EllipsisVertical, FlagIcon, Plus, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { toast } from 'sonner';
import AddToListButton from './add-to-list-button';

type Props = {
  hserviceId: string;
};

async function handleShareClick() {
  await navigator.clipboard.writeText(window.location.href);
  toast.success('Link copied to clipboard!');
}

export default function Menu({ hserviceId }: Props) {
  const [listId, setListId] = useState<string | null>(null);
  const { isLoading, user } = useContext(AuthContext);
  const isSignedIn = !isLoading && user !== null;

  const query = useQuery({
    queryKey: ['my-lists-info', hserviceId],
    queryFn: async () => {
      // TODO: Implement later
      return {} as any;
    },
    enabled: isSignedIn,
  });

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="block"
        >
          <Button
            className="flex items-center justify-center rounded-full"
            variant="ghost"
            size="icon"
          >
            <EllipsisVertical className="size-6 text-primary" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-48 space-y-2 p-2"
          align="end"
        >
          {isSignedIn && (
            <DialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer p-0">
                <Button
                  className="flex w-full justify-start hover:no-underline"
                  variant="link"
                  size="sm"
                  type="button"
                >
                  <Plus className="mr-2 size-4" />
                  Add to list
                </Button>
              </DropdownMenuItem>
            </DialogTrigger>
          )}

          <DropdownMenuItem className="cursor-pointer p-0">
            <Button
              className="flex w-full justify-start hover:no-underline"
              variant="link"
              size="sm"
              onClick={handleShareClick}
            >
              <Share2 className="mr-2 size-4" />
              Share
            </Button>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer p-0">
            <Button
              className="flex w-full justify-start hover:no-underline"
              variant="link"
              size="sm"
              asChild
            >
              <Link href={`/report?id=${hserviceId}&type=hservice`}>
                <FlagIcon className="mr-2 size-4" />
                Report
              </Link>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a list</DialogTitle>
          {/* <DialogDescription>
            {query.data && (
              <Select onValueChange={(v) => setListId(v)}>
                <SelectTrigger className="mt-4">
                  <SelectValue placeholder="Select a list" />
                </SelectTrigger>
                <SelectContent>
                  {query.data.map((list: any) => (
                    <SelectItem
                      value={list.id}
                      key={list.id}
                      disabled={list.includes}
                    >
                      {list.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </DialogDescription> */}
        </DialogHeader>
        <DialogFooter>
          <AddToListButton
            hserviceId={hserviceId}
            listId={listId}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
