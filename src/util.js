export const play_audio = (is_playing, audio_ref) => {
        if (is_playing) {
                const play_promise = audio_ref.current.play();
                if (play_promise !== undefined) {
                        play_promise.then(audio=>{
                                audio_ref.current.play();
                        });
                }
        }
}