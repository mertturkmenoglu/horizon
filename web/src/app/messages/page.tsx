import UserImage from '@/components/blocks/user-image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PlusIcon, SettingsIcon } from 'lucide-react';
import Link from 'next/link';

export default async function Page() {
  return (
    <Card className="flex h-full w-full flex-col">
      <CardHeader className="pb-0">
        <CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserImage src={null} />
              <div className="text-sm">Christopher</div>
            </div>

            <div className="flex items-center justify-end">
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger tabIndex={-1}>
                    <Link
                      href="/messages/new"
                      className="group inline-flex items-center justify-center rounded-full p-2 transition-all duration-500 ease-in-out hover:bg-primary/10"
                    >
                      <PlusIcon className="size-5 transition-all duration-500 ease-in-out group-hover:text-primary" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    sideOffset={8}
                  >
                    <p>New Chat</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger tabIndex={-1}>
                    <Link
                      href="/settings/preferences"
                      className="group inline-flex items-center justify-center rounded-full p-2 transition-all duration-500 ease-in-out hover:bg-primary/10"
                    >
                      <SettingsIcon className="size-5 transition-all duration-500 ease-in-out group-hover:text-primary" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    sideOffset={8}
                  >
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <Separator className="my-4" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-scroll">
        <div className="space-y-8">Messages</div>
      </CardContent>
    </Card>
  );
}
