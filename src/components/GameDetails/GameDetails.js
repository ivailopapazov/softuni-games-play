import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { GameContext } from '../../contexts/GameContext';

import * as gameService from '../../services/gameService';
import * as commentService from '../../services/commentService';

const GameDetails = () => {
    const navigate = useNavigate();
    const { addComment, fetchGameDetails, selectGame, gameRemove } = useContext(GameContext);
    const { gameId } = useParams();

    const currentGame = selectGame(gameId);

    useEffect(() => {
        (async () => {
            const gameDetails = await gameService.getOne(gameId);
            console.log(gameDetails);
            const gameComments = await commentService.getByGameId(gameId);

            fetchGameDetails(gameId, { ...gameDetails, comments: gameComments.map(x => `${x.user.email}: ${x.text}`) });
        })();
    }, [])

    const addCommentHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const comment = formData.get('comment');

        commentService.create(gameId, comment)
            .then(result => {
                addComment(gameId, comment);
            });
    };

    const gameDeleteHandler = () => {
        const confirmation = window.confirm('Are you sure you want to delete this game?');

        if (confirmation) {
            gameService.remove(gameId)
                .then(() => {
                    gameRemove(gameId);
                    navigate('/catalog');
                })
        }
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={currentGame.imageUrl} />
                    <h1>{currentGame.title}</h1>
                    <span className="levels">MaxLevel: {currentGame.maxLevel}</span>
                    <p className="type">{currentGame.category}</p>
                </div>
                <p className="text">
                    {currentGame.summary}
                </p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {currentGame.comments?.map(x =>
                            <li key={x} className="comment">
                                <p>{x}</p>
                            </li>
                        )}
                    </ul>

                    {!currentGame.comments &&
                        <p className="no-comment">No comments.</p>
                    }
                </div>

                <div className="buttons">
                    <Link to={`/games/${gameId}/edit`} className="button">
                        Edit
                    </Link>
                    <button onClick={gameDeleteHandler} className="button">
                        Delete
                    </button>
                </div>
            </div>

            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    <textarea
                        name="comment"
                        placeholder="Comment......"
                    />

                    <input
                        className="btn submit"
                        type="submit"
                        value="Add Comment"
                    />
                </form>
            </article>
        </section>
    );
};

export default GameDetails;
