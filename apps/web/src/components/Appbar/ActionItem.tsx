import { cn } from '@/lib/cn';
import * as Tooltip from '@radix-ui/react-tooltip';

type Props = TProps & {
  children: React.ReactNode;
  text: string;
};

const contentStyles = [
  'data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade',
  'data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade',
  'data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade',
  'data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade',
  'text-midnight select-none rounded bg-white px-4 py-2.5 text-base leading-none',
  'shadow',
  'will-change-[transform,opacity]',
];

function ActionItem({ className, children, text }: Props): React.ReactElement {
  return (
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={cn(contentStyles, className)}
            sideOffset={5}
            side="bottom"
          >
            {text}
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export default ActionItem;
