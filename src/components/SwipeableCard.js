import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const SwipeableCard = ({ questions = [] }) => {
  const [progress, setProgress] = useState(0);

  const handleSlideChange = (swiper) => {
    const newProgress = (swiper.activeIndex / (questions.length - 1)) * 100;
    setProgress(newProgress);
  };

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
              <h3>Pregunta en Español</h3>
              <span>{question.pregunta}</span>
              <br></br>
              <h3>Pregunta en Awajún</h3>
              <span>{question.awajun}</span>
              <div className="navigation">
                <p>{index + 1} / {questions.length}</p>
              </div>
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
    </div>
  );
};

export default SwipeableCard;