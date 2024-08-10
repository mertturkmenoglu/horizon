type Props = {
  title: string;
  text: string;
};

function Line({ title, text }: Props): React.ReactElement {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-2 font-bold">{title}:</div>
      <span className="col-span-10">{text === '' ? '-' : text}</span>
    </div>
  );
}

export default Line;
