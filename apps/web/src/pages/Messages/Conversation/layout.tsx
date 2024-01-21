import { useParams } from 'react-router-dom';

function Layout(): React.ReactElement {
  const { convId } = useParams();
  return (
    <div className="h-full">
      <div>{convId}</div>
    </div>
  );
}

export default Layout;
