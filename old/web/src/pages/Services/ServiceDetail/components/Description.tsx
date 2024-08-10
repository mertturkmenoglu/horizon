type Props = {
  description: string;
};

function Description({ description }: Props): React.ReactElement {
  return (
    <pre className="mt-8 max-w-4xl text-wrap break-normal font-sans text-base">
      {description.replace(/\t/g, '\n')}
    </pre>
  );
}

export default Description;
