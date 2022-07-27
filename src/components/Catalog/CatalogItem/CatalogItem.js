
import { Link } from 'react-router-dom';

const CatalogItem = ({ game }) => {
    return (
        <div className="allGames">
            <div className="allGames-info">
                <img src={game.imageUrl} />
                <h6>{game.category}</h6>
                <h2>{game.title}</h2>

                <Link to={`/catalog/${game._id}`} className="details-button">
                    Details
                </Link>

                <Link style={{marginLeft: '150px'}} to={`/games/${game._id}/edit`} className="details-button">
                    Edit
                </Link>
            </div>

        </div>
    );
};

export default CatalogItem;
