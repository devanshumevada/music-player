import {useState, useRef} from 'react';
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';
import './styles/app.scss';
import get_songs_list from './utils';

const App = () => {
	const audio_ref = useRef(null);
	const [library_status, set_library_status] = useState(false);
	const [songs, set_songs] = useState(get_songs_list());
	const [current_song, set_current_song] = useState(songs[0]);
	const [is_playing, set_is_playing] = useState(false);
	const [song_info, set_song_info] = useState({
                current_time: 0,
                duration: 0
	});
	
	const handle_time_update = e  => {
                set_song_info({
                        ...song_info,
                        current_time: e.target.currentTime,
                        duration: e.target.duration

                });
        }
	return (
		<div className="App">
			<Nav library_status={library_status} set_library_status={set_library_status} />
			<Song current_song={current_song} />
			<Player
			song_info={song_info}
			set_song_info={set_song_info}
			audio_ref={audio_ref}
			current_song={current_song}
			is_playing={is_playing}
			set_is_playing={set_is_playing} />
			
			<Library  set_current_song={set_current_song} 
				  songs={songs}
				  set_songs={set_songs}
				  audio_ref={audio_ref}
				  is_playing={is_playing}
				  library_status={library_status}
				  set_library_status={set_library_status} />
			<audio 
                                onLoadedMetadata={handle_time_update}  
                                onTimeUpdate={handle_time_update} 
                                ref={audio_ref} 
                                src={current_song.audio}>

                        </audio>
		</div>
	);
}

export default App;