const LibrarySong = props => {
        const handle_selected_song = ()  => {

                props.set_current_song(props.song);
                const updated_songs = props.songs.map(song=>{
                        if (song.id === props.id) {
                                return {...song, active:true}
                                
                        } else {
                                return {
                                        ...song, active:false
                                }
                        }
                });
                props.set_songs(updated_songs);
                // Checking for the audio to load up
                if (props.is_playing) {
                        const play_promise = props.audio_ref.current.play();
                        if (play_promise !== undefined) {
                                play_promise.then(audio=>{
                                        props.audio_ref.current.play();
                                });
                        }
                }
                props.set_library_status(false);
        }
        return (
                <div onClick={handle_selected_song} className={`library-song ${props.song.active ? "selected" : ""}`}>
                        <img src={props.song.cover} alt={`Cover of ${props.song.name}`} />
                        <div className="song-description">
                                <h3>{props.song.name}</h3>
                                <h4>{props.song.artist}</h4>
                        </div>
                </div>

                       
        );
}

export default LibrarySong;