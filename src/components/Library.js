import LibrarySong from './LibrarySong';
const Library = props => {
        return (
                <div className={`library ${props.library_status ? 'active-library': ''}`}>
                        <h2>Library</h2>
                        <div className="library-songs">
                                {props.songs.map(song => {
                                        return <LibrarySong  
                                                        songs={props.songs} 
                                                        song={song} 
                                                        set_current_song={props.set_current_song} 
                                                        key={song.id}
                                                        audio_ref={props.audio_ref}
                                                        is_playing={props.is_playing}
                                                        set_songs={props.set_songs}
                                                        id={song.id}
                                                        set_library_status={props.set_library_status}  />
                                })}
                        </div>
                </div>
        );
}

export default Library;