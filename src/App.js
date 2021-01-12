import {useState} from 'react';
import Player from './components/Player';
import Song from './components/Song';
import './styles/app.scss';
import get_songs_list from './utils';

const App = () => {
	const [songs, set_songs] = useState(get_songs_list());
	const [current_song, set_current_song] = useState(songs[0]);
	const [is_playing, set_is_playing] = useState(false);
	return (
		<div className="App">
			<Song current_song={current_song} />
			<Player 
			current_song={current_song}
			is_playing={is_playing}
			set_is_playing={set_is_playing} />
		</div>
	);
}

export default App;