import { cn } from '@/lib/cn';
import * as RadixTooltip from '@radix-ui/react-tooltip';

export type Props = TProps & {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: 'bottom' | 'top' | 'right' | 'left' | undefined;
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

function Tooltip({
  className,
  children,
  content,
  side = 'bottom',
}: Props): React.ReactElement {
  return (
    <RadixTooltip.Provider delayDuration={300}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className={cn(contentStyles, className)}
            sideOffset={5}
            side={side}
            data-testid="tooltip-content"
          >
            {content}
            <RadixTooltip.Arrow className="fill-white" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

export default Tooltip;
