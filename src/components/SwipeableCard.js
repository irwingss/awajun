import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const SwipeableCard = ({ questions = [] }) => {
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const [audioError, setAudioError] = useState(null);

  const handleSlideChange = (swiper) => {
    const newProgress = (swiper.activeIndex / (questions.length - 1)) * 100;
    setProgress(newProgress);
  };

  const playAudio = (audioFile) => {
    if (audioRef.current && audioFile) {
      setAudioError(null);
      const tryPlay = (extension) => {
        const audioPath = `/voces/${audioFile}.${extension}`;
        audioRef.current.src = audioPath;
        audioRef.current.play().catch(error => {
          console.error(`Error playing ${extension} file:`, error);
          setAudioError(`Error playing ${extension} file: ${error.message}`);
          if (extension === 'wav') {
            tryPlay('mp3');
          } else {
            console.error('Failed to play audio file:', audioFile);
            setAudioError(`Failed to play audio file: ${audioFile}`);
          }
        });
      };

      tryPlay('wav');
    } else {
      console.error('Audio file not specified or audio reference not available');
      setAudioError('Audio file not specified or audio reference not available');
    }
  };

  useEffect(() => {
    // Log the audio files for each question
    questions.forEach((question, index) => {
      console.log(`Question ${index + 1} audio file:`, question.audios);
    });
  }, [questions]);

  return (
    <div className="card-container">
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        onSlideChange={handleSlideChange}
      >
        {questions.map((question, index) => (
          <SwiperSlide key={index}>
            <div className="card">
              <button 
                className="audio-button"
                onClick={() => playAudio(question.audios)}
                aria-label="Reproducir audio"
                disabled={!question.audios}
              >
                <i className="fas fa-volume-up"></i>
              </button>
              <h3>Pregunta en Español</h3>
              <span>{question.pregunta}</span>
              <br />
              <h3>Pregunta en Awajún</h3>
              <span>{question.awajun}</span>
              <div className="navigation">
                <p>{index + 1} / {questions.length}</p>
              </div>
              {audioError && <p className="audio-error">{audioError}</p>}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
      <div className="progress-bar">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default SwipeableCard;