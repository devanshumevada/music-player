const Song = props => {
        return (
                <div className="song">
                        <div className="song-container">
                                <img src={props.current_song.cover} alt={`Cover of ${props.current_song.name}`} />
                                <h2>{props.current_song.name}</h2>
                                <h3>{props.current_song.artist}</h3>
                        </div>

                       
                </div>
        );
}

export default Song;