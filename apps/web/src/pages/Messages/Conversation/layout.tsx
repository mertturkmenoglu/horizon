import { useParams } from 'react-router-dom';

function Layout(): React.ReactElement {
  const { convId } = useParams();
  return (
    <div>
      <div>{convId}</div>
    </div>
  );
}

export default Layout;
