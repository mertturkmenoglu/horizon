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
    <div className={cn('w-full flex items-start space-x-2', props.className)}>
      <props.icon className="size-6 min-w-6 min-h-6 text-sky-600" />
      <div className="text-sm text-wrap wrap break-all">{props.text}</div>
    </div>
  );
}
