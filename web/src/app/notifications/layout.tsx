import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SettingsIcon } from 'lucide-react';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className="container my-16 grid grid-cols-12 gap-4">
      <div className="col-span-4">
        <Card className="flex flex-col">
          <CardHeader className="pb-0">
            <CardTitle>
              <div className="flex items-center justify-between">
                <div>Notifications</div>

                <div className="flex items-center justify-end">
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

              
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-2">
            <Button
              asChild
              variant="link"
              className="flex justify-start px-0 text-left"
            >
              <Link href="/notifications">All Notifications</Link>
            </Button>
            <Link href="/notifications/unread">Unread Notifications</Link>
            <Button>Mark All as Read</Button>
            <Button>Delete All</Button>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-8">
        <div>Notifications</div>
        <div>{children}</div>
      </div>
    </div>
  );
}
