import {useState, useRef} from 'react';
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';
import './styles/app.scss';
import get_songs_list from './data';

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
	
	const handle_song_endings = async () => {
		const current_song_position = songs.findIndex(song => song.id === current_song.id);
		let next_song_position = (current_song_position + 1) % songs.length;
                next_song_position = next_song_position >= 0 ? next_song_position : songs.length - 1;
		await set_current_song(songs[next_song_position]);
		active_library_handler(songs[next_song_position]);
		if (is_playing) {
			audio_ref.current.play();
		}
	}

	const active_library_handler = next_prev => {
                const updated_songs = songs.map(song=>{
                        if (song.id === next_prev.id) {
                                return {...song, active:true}
                                
                        } else {
                                return {
                                        ...song, active:false
                                }
                        }
		});
                set_songs(updated_songs); 
        }
	return (
		<div className={`App ${library_status ? "library-active" : ""}`}>
			<Nav 
				library_status={library_status} 
				set_library_status={set_library_status} />

			<Song current_song={current_song} />
			
			<Player
				song_info={song_info}
				set_song_info={set_song_info}
				audio_ref={audio_ref}
				current_song={current_song}
				is_playing={is_playing}
				set_is_playing={set_is_playing} 
				songs={songs}
				set_current_song={set_current_song}
				set_songs={set_songs}
				active_library_handler={active_library_handler} />
			
			<Library  
				set_current_song={set_current_song} 
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
                                src={current_song.audio}
				onEnded={handle_song_endings}>

                        </audio>
		</div>
	);
}

export default App;