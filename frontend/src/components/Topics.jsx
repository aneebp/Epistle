import React, { useState, useEffect, useRef } from "react";

const Topics = () => {
  const [currentSlidePos, setCurrentSlidePos] = useState(0);
  const [totalSliderVisibleItems, setTotalSliderVisibleItems] = useState(0);
  const [totalSlidableItems, setTotalSlidableItems] = useState(0);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const sliderContainerRef = useRef(null);
  const sliderRef = useRef(null);

  const moveSliderItem = () => {
    const sliderContainer = sliderContainerRef.current;
    if (sliderContainer && sliderContainer.children[currentSlidePos]) {
      sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
      setIsPrevDisabled(currentSlidePos <= 0);
      setIsNextDisabled(currentSlidePos >= totalSlidableItems);
    }
  };

  const slideNext = () => {
    if (currentSlidePos < totalSlidableItems) {
      setCurrentSlidePos((prev) => prev + 1);
    }
  };

  const slidePrev = () => {
    if (currentSlidePos > 0) {
      setCurrentSlidePos((prev) => prev - 1);
    }
  };

  const handleResize = () => {
    const slider = sliderRef.current;
    const sliderContainer = sliderContainerRef.current;
    if (slider && sliderContainer) {
      setTotalSliderVisibleItems(
        Number(getComputedStyle(slider).getPropertyValue("--slider-items"))
      );
      setTotalSlidableItems(
        sliderContainer.childElementCount - totalSliderVisibleItems
      );
      moveSliderItem();
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    const sliderContainer = sliderContainerRef.current;
    if (slider && sliderContainer) {
      setTotalSliderVisibleItems(
        Number(getComputedStyle(slider).getPropertyValue("--slider-items"))
      );
      setTotalSlidableItems(
        sliderContainer.childElementCount - totalSliderVisibleItems
      );

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    moveSliderItem();
  }, [currentSlidePos, totalSlidableItems]);

  return (
    <>
      <section className="topics" id="topics" aria-labelledby="topic-label">
        <div className="container">
          <div className="card topic-card">
            <div className="card-content">
              <h2
                className="headline headline-2 section-title card-title"
                id="topic-label"
              >
                Trending Now
              </h2>

              <p className="card-text">
                Dive into our selection of must-read blog posts that are
                currently making waves.
              </p>

              <div className="btn-group">
                <button
                  className="btn-icon"
                  aria-label="previous"
                  data-slider-prev
                  onClick={slidePrev}
                  disabled={isPrevDisabled}
                >
                  <ion-icon name="arrow-back" aria-hidden="true"></ion-icon>
                </button>

                <button
                  className="btn-icon"
                  aria-label="next"
                  data-slider-next
                  onClick={slideNext}
                  disabled={isNextDisabled}
                >
                  <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
                </button>
              </div>
            </div>

            <div className="slider" data-slider ref={sliderRef}>
              <ul
                className="slider-list"
                data-slider-container
                ref={sliderContainerRef}
              >
                <li className="slider-item">
                  <a href="#" className="slider-card">
                    <figure
                      className="slider-banner img-holder"
                      style={{ "--width": 507, "--height": 618 }}
                    >
                      <img
                        src="./src/assets/images/topic-1.png"
                        width="507"
                        height="618"
                        loading="lazy"
                        alt="Sport"
                        className="img-cover"
                      />
                    </figure>

                    <div className="slider-content">
                      <span className="slider-title">Sport</span>

                      <p className="slider-subtitle">38 Articles</p>
                    </div>
                  </a>
                </li>

                <li className="slider-item">
                  <a href="#" className="slider-card">
                    <figure
                      className="slider-banner img-holder"
                      style={{ "--width": 507, "--height": 618 }}
                    >
                      <img
                        src="./src/assets/images/topic-2.png"
                        width="507"
                        height="618"
                        loading="lazy"
                        alt="Travel"
                        className="img-cover"
                      />
                    </figure>

                    <div className="slider-content">
                      <span className="slider-title">Travel</span>

                      <p className="slider-subtitle">63 Articles</p>
                    </div>
                  </a>
                </li>

                <li className="slider-item">
                  <a href="#" className="slider-card">
                    <figure
                      className="slider-banner img-holder"
                      style={{ "--width": 507, "--height": 618 }}
                    >
                      <img
                        src="./src/assets/images/topic-3.png"
                        width="507"
                        height="618"
                        loading="lazy"
                        alt="Design"
                        className="img-cover"
                      />
                    </figure>

                    <div className="slider-content">
                      <span className="slider-title">Design</span>

                      <p className="slider-subtitle">78 Articles</p>
                    </div>
                  </a>
                </li>

                <li className="slider-item">
                  <a href="#" className="slider-card">
                    <figure
                      className="slider-banner img-holder"
                      style={{ "--width": 507, "--height": 618 }}
                    >
                      <img
                        src="./src/assets/images/topic-4.png"
                        width="507"
                        height="618"
                        loading="lazy"
                        alt="Movie"
                        className="img-cover"
                      />
                    </figure>

                    <div className="slider-content">
                      <span className="slider-title">Movie</span>

                      <p className="slider-subtitle">125 Articles</p>
                    </div>
                  </a>
                </li>

                <li className="slider-item">
                  <a href="#" className="slider-card">
                    <figure
                      className="slider-banner img-holder"
                      style={{ "--width": 507, "--height": 618 }}
                    >
                      <img
                        src="./src/assets/images/topic-5.png"
                        width="507"
                        height="618"
                        loading="lazy"
                        alt="Lifestyle"
                        className="img-cover"
                      />
                    </figure>

                    <div className="slider-content">
                      <span className="slider-title">Lifestyle</span>

                      <p className="slider-subtitle">78 Articles</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Topics;
