import { BookmarkIcon as FavEmpty } from '@heroicons/react/24/outline';
import { BookmarkIcon as FavFilled } from '@heroicons/react/24/solid';

type Props = {
  onClick: () => void;
  isFavorite: boolean;
};

function FavoriteButton({ isFavorite, onClick }: Props): React.ReactElement {
  return (
    <button onClick={onClick}>
      {isFavorite ? (
        <div className="flex items-center gap-2">
          <FavFilled className="size-8 fill-sky-500" />
          <span className="">Remove from favorites</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <FavEmpty className="size-8" />
          <span>Add to favorites</span>
        </div>
      )}
    </button>
  );
}

export default FavoriteButton;
