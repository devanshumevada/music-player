import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faPause ,faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

const Player = props  => {
        
        const handle_song_play = () => {
                if (props.is_playing) {
                        props.audio_ref.current.pause();
                        props.set_is_playing(!props.is_playing);
                } else {
                        props.audio_ref.current.play();
                        props.set_is_playing(!props.is_playing);
                }
        }


        const handle_drag = e => {
               props.audio_ref.current.currentTime = e.target.value;
                props.set_song_info({
                        ...props.song_info,
                        current_time: e.target.value
                });
        }

        const get_formatted_time = time => {
                return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
        }

       
        return (
                <div className="player">
                       <div className="time-control">
                                <p>{get_formatted_time(props.song_info.current_time)}</p>
                                <input onChange={handle_drag} min={0} max={props.song_info.duration || 0} value={props.song_info.current_time} type="range" />
                                <p>{get_formatted_time(props.song_info.duration || 0)}</p>

                        </div>

                        <div className="player-control">
                                <FontAwesomeIcon 
                                        className="skip_back" 
                                        icon={faAngleLeft} 
                                        size="2x" />
                                

                                <FontAwesomeIcon
                                        onClick={handle_song_play} 
                                        className="play" 
                                        icon={!props.is_playing ? faPlay: faPause}
                                        size="2x" />
                                
                                
                                <FontAwesomeIcon 
                                        className="skip_forward" 
                                        icon={faAngleRight} 
                                        size="2x" />
                        </div>

                </div>
        );
}

export default Player;