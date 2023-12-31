import { cn } from '@/lib/cn';

interface InfoProps {
  icon: TwIcon;
  text: string;
  className?: string;
  show: boolean;
}

export function Info(props: InfoProps): React.ReactElement {
  if (!props.show) {
    return <></>;
  }

  return (
    <div
      className={cn(
        'flex w-full items-start space-x-2 lining-nums',
        props.className
      )}
    >
      <props.icon className="size-6 min-h-6 min-w-6 text-sky-600" />
      <div className="wrap text-wrap break-all text-sm">{props.text}</div>
    </div>
  );
}
