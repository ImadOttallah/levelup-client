import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes } from '../../utils/data/gameData';

const GameForm = ({ user }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState({
    skill_level: 1,
    number_of_players: 0,
    title: '',
    maker: '',
    game_type_id: 0,
  });
  const router = useRouter();
  console.warn(gameTypes);

  useEffect(() => {
    getGameTypes().then(setGameTypes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const game = {
      maker: currentGame.maker,
      title: currentGame.title,
      number_of_players: Number(currentGame.number_of_players),
      skill_level: Number(currentGame.skill_level),
      game_type: Number(currentGame.game_type_id),
      user_id: user.uid,
    };

    // Send POST request to your API
    createGame(game).then(() => router.push('/games'));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" value={currentGame.title} onChange={handleChange} required />
          <Form.Label>Maker</Form.Label>
          <Form.Control name="maker" value={currentGame.maker} onChange={handleChange} required />
          <Form.Label>Number Of Players</Form.Label>
          <Form.Control name="number_of_players" type="number" value={currentGame.number_of_players} onChange={handleChange} required />
          <Form.Label>Skill Level</Form.Label>
          <Form.Control name="skill_level" type="number" value={currentGame.skill_level} onChange={handleChange} required />

          <Form.Label>Game Type</Form.Label>
          <Form.Select onChange={handleChange} className="mb-3" name="game_type" value={currentGame.game_type} required>
            <option value="">Select a Game Type</option>
            {gameTypes.map((gameType) => (
              <option defaultValue={gameType.id === currentGame.game_type_id} key={gameType.label} value={gameType.id}>
                {gameType.label}
              </option>
            ))}
          </Form.Select>

        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default GameForm;
