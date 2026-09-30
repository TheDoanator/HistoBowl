import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FadeIn from '../components/FadeIn';

export default function PlayerDetail() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/players/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPlayer(data);
      });
  }, [id]);

  console.log(player);

  if (!player) {
  return <div>Loading...</div>;
}

return (
  <FadeIn>
    <div>
      <h1>{player.name}</h1>
      <p>Hometown: {player.hometown}</p>
      <p>Titles: {player.titles}</p>
      <p>Earnings: {player.earnings}</p>
      <p>Active: {player.currently_active ? 'Yes' : 'No'}</p>
    </div>
  </FadeIn>
);
}
