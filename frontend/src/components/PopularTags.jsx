import React from "react";
const PopularTags = () => {
  return (
    <>
      <section className="tags" id="tags" aria-labelledby="tag-label">
        <div className="container">
          <h2 className="headline headline-2 section-title" id="tag-label">
            <span className="span">Popular Tags</span>
          </h2>

          <p className="section-text">Most searched keywords</p>

          <ul className="grid-list">
            <li>
              <button className="card tag-btn">
                <img
                  src="./src/assets/images/tag1.png"
                  width="32"
                  height="32"
                  loading="lazy"
                  alt="Travel"
                />

                <p className="btn-text">Travel</p>
              </button>
            </li>

            <li>
              <button className="card tag-btn">
                <img
                  src="./src/assets/images/tag2.png"
                  width="32"
                  height="32"
                  loading="lazy"
                  alt="Culture"
                />

                <p className="btn-text">Culture</p>
              </button>
            </li>

            <li>
              <button className="card tag-btn">
                <img
                  src="./src/assets/images/tag3.png"
                  width="32"
                  height="32"
                  loading="lazy"
                  alt="Lifestyle"
                />

                <p className="btn-text">Lifestyle</p>
              </button>
            </li>

            <li>
              <button className="card tag-btn">
                <img
                  src="./src/assets/images/tag4.png"
                  width="32"
                  height="32"
                  loading="lazy"
                  alt="Fashion"
                />

                <p className="btn-text">Fashion</p>
              </button>
            </li>

            <li>
              <button className="card tag-btn">
                <img
                  src="./src/assets/images/tag5.png"
                  width="32"
                  height="32"
                  loading="lazy"
                  alt="Food"
                />

                <p className="btn-text">Food</p>
              </button>
            </li>

            <li>
              <button className="card tag-btn">
                <img
                  src="./src/assets/images/tag6.png"
                  width="32"
                  height="32"
                  loading="lazy"
                  alt="Space"
                />

                <p className="btn-text">Space</p>
              </button>
            </li>

            <li>
              <button className="card tag-btn">
                <img
                  src="./src/assets/images/tag7.png"
                  width="32"
                  height="32"
                  loading="lazy"
                  alt="Animal"
                />

                <p className="btn-text">Animal</p>
              </button>
            </li>

            <li>
              <button className="card tag-btn">
                <img
                  src="./src/assets/images/tag8.png"
                  width="32"
                  height="32"
                  loading="lazy"
                  alt="Minimal"
                />

                <p className="btn-text">Minimal</p>
              </button>
            </li>

            <li>
              <button className="card tag-btn">
                <img
                  src="./src/assets/images/tag9.png"
                  width="32"
                  height="32"
                  loading="lazy"
                  alt="Interior"
                />

                <p className="btn-text">Interior</p>
              </button>
            </li>

            <li>
              <button className="card tag-btn">
                <img
                  src="./src/assets/images/tag10.png"
                  width="32"
                  height="32"
                  loading="lazy"
                  alt="Plant"
                />

                <p className="btn-text">Plant</p>
              </button>
            </li>

            <li>
              <button className="card tag-btn">
                <img
                  src="./src/assets/images/tag11.png"
                  width="32"
                  height="32"
                  loading="lazy"
                  alt="Nature"
                />

                <p className="btn-text">Nature</p>
              </button>
            </li>

            <li>
              <button className="card tag-btn">
                <img
                  src="./src/assets/images/tag12.png"
                  width="32"
                  height="32"
                  loading="lazy"
                  alt="Business"
                />

                <p className="btn-text">Business</p>
              </button>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default PopularTags;
