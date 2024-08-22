import UserImage from '@/components/blocks/user-image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getAuth } from '@/lib/auth';
import { PlusIcon, SettingsIcon } from 'lucide-react';
import Link from 'next/link';

const chats = [
  {
    id: 1,
    name: 'John Doe',
    lastMessage: 'Hello, how are you?',
    lastMessageTime: '10:00 AM',
    unreadMessages: 57,
  },
  {
    id: 2,
    name: 'Jane Doe',
    lastMessage: 'How are you?',
    lastMessageTime: '11:00 AM',
    unreadMessages: 0,
  },
  {
    id: 3,
    name: 'John Doe',
    lastMessage: 'Do you have a minute?',
    lastMessageTime: '10:00 AM',
    unreadMessages: 2,
  },
  {
    id: 4,
    name: 'Jane Doe',
    lastMessage: 'About your project',
    lastMessageTime: '11:00 AM',
    unreadMessages: 0,
  },
  {
    id: 5,
    name: 'John Doe',
    lastMessage: 'Hello, how are you?',
    lastMessageTime: '10:00 AM',
    unreadMessages: 2,
  },
  {
    id: 6,
    name: 'Jane Doe',
    lastMessage: 'How are you?',
    lastMessageTime: '11:00 AM',
    unreadMessages: 0,
  },
  {
    id: 7,
    name: 'John Doe',
    lastMessage: 'Do you have a minute?',
    lastMessageTime: '10:00 AM',
    unreadMessages: 2,
  },
  {
    id: 8,
    name: 'Jane Doe',
    lastMessage: 'About your project',
    lastMessageTime: '11:00 AM',
    unreadMessages: 0,
  },
  {
    id: 9,
    name: 'John Doe',
    lastMessage: 'Hello, how are you?',
    lastMessageTime: '10:00 AM',
    unreadMessages: 2,
  },
  {
    id: 10,
    name: 'Jane Doe',
    lastMessage: 'How are you?',
    lastMessageTime: '11:00 AM',
    unreadMessages: 0,
  },
  {
    id: 11,
    name: 'John Doe',
    lastMessage: 'Do you have a minute?',
    lastMessageTime: '10:00 AM',
    unreadMessages: 2,
  },
  {
    id: 12,
    name: 'Jane Doe',
    lastMessage: 'About your project',
    lastMessageTime: '11:00 AM',
    unreadMessages: 0,
  },
  {
    id: 13,
    name: 'John Doe',
    lastMessage: 'Hello, how are you?',
    lastMessageTime: '10:00 AM',
    unreadMessages: 2,
  },
  {
    id: 14,
    name: 'Jane Doe',
    lastMessage: 'How are you?',
    lastMessageTime: '11:00 AM',
    unreadMessages: 0,
  },
  {
    id: 15,
    name: 'John Doe',
    lastMessage: 'Do you have a minute?',
    lastMessageTime: '10:00 AM',
    unreadMessages: 2,
  },
  {
    id: 16,
    name: 'Jane Doe',
    lastMessage: 'About your project',
    lastMessageTime: '11:00 AM',
    unreadMessages: 0,
  },
  {
    id: 17,
    name: 'John Doe',
    lastMessage: 'Hello, how are you?',
    lastMessageTime: '10:00 AM',
    unreadMessages: 2,
  },
  {
    id: 18,
    name: 'Jane Doe',
    lastMessage: 'How are you?',
    lastMessageTime: '11:00 AM',
    unreadMessages: 0,
  },
  {
    id: 19,
    name: 'John Doe',
    lastMessage: 'Do you have a minute?',
    lastMessageTime: '10:00 AM',
    unreadMessages: 2,
  },
  {
    id: 20,
    name: 'Jane Doe',
    lastMessage: 'About your project',
    lastMessageTime: '11:00 AM',
    unreadMessages: 0,
  },
  {
    id: 21,
    name: 'John Doe',
    lastMessage: 'Hello, how are you?',
    lastMessageTime: '10:00 AM',
    unreadMessages: 2,
  },
  {
    id: 22,
    name: 'Jane Doe',
    lastMessage: 'How are you?',
    lastMessageTime: '11:00 AM',
    unreadMessages: 0,
  },
  {
    id: 23,
    name: 'John Doe',
    lastMessage: 'Do you have a minute?',
    lastMessageTime: '10:00 AM',
    unreadMessages: 2,
  },
  {
    id: 24,
    name: 'Jane Doe',
    lastMessage: 'About your project',
    lastMessageTime: '11:00 AM',
    unreadMessages: 0,
  },
  {
    id: 25,
    name: 'John Doe',
    lastMessage: 'Hello, how are you?',
    lastMessageTime: '10:00 AM',
    unreadMessages: 2,
  },
  {
    id: 26,
    name: 'Jane Doe',
    lastMessage: 'How are you?',
    lastMessageTime: '11:00 AM',
    unreadMessages: 0,
  },
  {
    id: 27,
    name: 'John Doe',
    lastMessage: 'Do you have a minute?',
    lastMessageTime: '10:00 AM',
    unreadMessages: 2,
  },
  {
    id: 28,
    name: 'Jane Doe',
    lastMessage: 'About your project',
    lastMessageTime: '11:00 AM',
    unreadMessages: 0,
  },
];

export default async function MessagesList() {
  const auth = await getAuth();
  const firstName = auth?.data.fullName.split(' ')[0] ?? '';

  return (
    <Card className="flex h-[70vh] flex-col">
      <CardHeader className="pb-0">
        <CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserImage src={auth?.data.profileImage ?? null} />
              <div className="text-sm">{firstName}</div>
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
        <div className="space-y-8">
          {chats.map((chat) => (
            <MessagesListItem
              {...chat}
              key={chat.id}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function MessagesListItem({
  id,
  name,
  lastMessage,
  lastMessageTime,
  unreadMessages,
}: {
  id: number;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadMessages: number;
}) {
  return (
    <div className="flex items-start gap-2">
      {/* user image */}
      <UserImage src={null} />

      {/* name + message */}
      <div className="flex flex-col gap-1">
        <div className="text-sm">{name}</div>
        <div className="text-xs text-muted-foreground">{lastMessage}</div>
      </div>

      {/* Time + unread messages + actions */}
      <div className="ml-auto flex flex-col items-end gap-2">
        <div className="text-xs text-muted-foreground">{lastMessageTime}</div>
        {unreadMessages > 0 && (
          <div className="flex aspect-square w-min items-center justify-center rounded-full bg-primary text-xs text-white">
            <span className="p-px">
              {unreadMessages > 99 ? '99+' : unreadMessages}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
