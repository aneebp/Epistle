import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BPost from "../components/BPost";

const Allblogposts = () => {
  return (
    <>
      <Header></Header>
      <section className="section feature" aria-label="feature" id="featured">
        <div style={{ marginTop: 100 }} className="container">
          <h2 className="headline headline-2 section-title">
            <span className="span" style={{ marginBottom: 50 }}>
              Discover Inspiring Stories
            </span>
          </h2>

          <BPost />
          <BPost />
        </div>

        <img
          src="./src/assets/images/shadow-3.svg"
          width="500"
          height="1500"
          loading="lazy"
          alt=""
          className="feature-bg"
        />
      </section>
      <Footer></Footer>
    </>
  );
};

export default Allblogposts;
