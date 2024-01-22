import Input from '@/components/Input';
import { getUserImage } from '@/lib/img';
import {
  EllipsisVerticalIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { useParams } from 'react-router-dom';

const data = {
  id: 'abc',
  user: {
    id: 'c',
    name: 'Ceren 1',
    username: 'ceren',
    profileImage: null,
  },
};

function Layout(): React.ReactElement {
  const { convId } = useParams();
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={getUserImage(data.user.profileImage)}
            alt=""
            className="size-12 rounded-full"
          />
          <div className="text-midnight">
            <div className="font-bold">{data.user.name}</div>
            <div className="text-sm text-neutral-500">
              @{data.user.username}
            </div>
          </div>
        </div>

        <div className="">
          <button className="rounded-full p-2 hover:bg-neutral-400/20">
            <EllipsisVerticalIcon className="size-8" />
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto py-4">
        message1 message2 Lorem, ipsum dolor sit amet consectetur adipisicing
        elit. Amet minus porro laudantium, nulla est nemo similique? Harum hic
        vero nulla reprehenderit. Deleniti eos error in ipsum cumque? Harum,
        molestias odio.
        <div>{convId}</div>
        {new Array(100).fill(0).map((_, i) => (
          <div key={i}>Message {i}</div>
        ))}
      </div>
      <div className="mt-4 flex items-center space-x-4 p-2">
        <Input
          label=""
          placeholder="Type a message"
          className="flex-grow"
        />
        <button className="rounded-full bg-sky-500 p-4">
          <PaperAirplaneIcon className="size-6 -rotate-[32deg] text-white" />
        </button>
      </div>
    </div>
  );
}

export default Layout;
