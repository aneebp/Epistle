import React, { useState, useEffect, useRef } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const Topics = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await api.get("api/category/list/");
        setCategory(res.data);
      } catch (error) {
        console.log("Error during fetching category", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -300, // Adjust the scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 300, // Adjust the scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
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
                    onClick={scrollLeft}
                  >
                    <ion-icon name="arrow-back" aria-hidden="true"></ion-icon>
                  </button>

                  <button
                    className="btn-icon"
                    aria-label="next"
                    onClick={scrollRight}
                  >
                    <ion-icon
                      name="arrow-forward"
                      aria-hidden="true"
                    ></ion-icon>
                  </button>
                </div>
              </div>

              <div className="slider" ref={sliderRef}>
                <ul className="slider-list">
                  {category.map((cat) => (
                    <li key={cat.id} className="slider-item">
                      <Link
                        to={`/topic/post/${cat.slug}`}
                        className="slider-card"
                      >
                        <figure
                          className="slider-banner img-holder"
                          style={{ "--width": 507, "--height": 618 }}
                        >
                          <img
                            src={cat.image}
                            width="507"
                            height="618"
                            loading="lazy"
                            alt={cat.title}
                            className="img-cover"
                          />
                        </figure>

                        <div className="slider-content">
                          <span className="slider-title">{cat.title}</span>

                          <p className="slider-subtitle">
                            {cat.post_count} Articles
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Topics;
