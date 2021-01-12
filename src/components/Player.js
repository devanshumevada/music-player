import {useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faPause ,faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

const Player = props  => {
        const audio_ref = useRef(null);
        const handle_song_play = () => {
                if (props.is_playing) {
                        audio_ref.current.pause();
                        props.set_is_playing(!props.is_playing);
                } else {
                        audio_ref.current.play();
                        props.set_is_playing(!props.is_playing);
                }
        }

        const handle_time_update = e  => {
                set_song_info({
                        ...song_info,
                        current_time: e.target.currentTime,
                        duration: e.target.duration

                });
        }

        const handle_drag = e => {
                audio_ref.current.currentTime = e.target.value;
                set_song_info({
                        ...song_info,
                        current_time: e.target.value
                });
        }

        const get_formatted_time = time => {
                return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
        }

        const [song_info, set_song_info] = useState({
                current_time: 0,
                duration: 0
        });
        return (
                <div className="player">
                       <div className="time-control">
                                <p>{get_formatted_time(song_info.current_time)}</p>
                                <input onChange={handle_drag} min={0} max={song_info.duration} value={song_info.current_time} type="range" />
                                <p>{get_formatted_time(song_info.duration)}</p>

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

                        <audio 
                                onLoadedMetadata={handle_time_update}  
                                onTimeUpdate={handle_time_update} 
                                ref={audio_ref} 
                                src={props.current_song.audio}>

                        </audio>
                </div>
        );
}

export default Player;