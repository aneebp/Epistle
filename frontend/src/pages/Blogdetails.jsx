import React from "react";
import "../styles/blogdetail.css";

const Blogdetails = () => {
  return (
    <>
      <div className="blog-detail">
        {/* Back Button */}
        <button className="back-button" onClick={() => window.history.back()}>
          &larr; Back
        </button>

        {/* User-uploaded Image */}
        <div className="blog-header">
          <img
            src="./src/assets/images/featured-5.png" // Replace with actual image source
            alt="Blog Header"
            className="blog-header-image"
          />
        </div>

        {/* Blog Content Section */}
        <section className="section feature" aria-label="feature" id="featured">
          <div className="container">
            <h2 className="headline headline-2 section-title">
              <span className="span">
                Top 10 AI Websitses to Improve Your Life
              </span>
            </h2>

            <p className="section-text">Published at - 12 Aug 2032</p>

            <p className="blog-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores beatae expedita facere? Quasi suscipit, eligendi vero
              officia explicabo inventore optio tempore esse! Ratione ipsam
              expedita soluta nam provident unde ducimus amet modi ipsum
              repudiandae perspiciatis distinctio et reiciendis, nisi facere
              reprehenderit accusantium! Deleniti enim accusamus tempora
              corporis ut nihil eos, impedit consequuntur, tempore error
              aspernatur est beatae consectetur! Est ut, optio error perferendis
              alias totam ea, at praesentium blanditiis earum velit dolorem quae
              esse ducimus nam, delectus ullam quod. Est nisi distinctio saepe
              quos et explicabo totam quod esse natus delectus harum, dolores
              asperiores, quibusdam dolorum cum tenetur consequatur voluptates
              ut corrupti eius nesciunt ad nihil. Fuga quis officia, voluptatum
              sed quo nemo ipsam minus in recusandae. Alias quia tenetur
              accusantium voluptates adipisci obcaecati eligendi nesciunt
              voluptatibus soluta molestiae omnis nam dolorem aliquam nobis
              minima, accusamus architecto rerum aut expedita libero
              repudiandae? Fugiat, explicabo itaque consequatur ad aut sed
              corrupti perspiciatis sapiente sunt, unde voluptatum perferendis
              optio commodi dolores expedita sint pariatur similique in? Culpa,
              nostrum repellat aut placeat neque sapiente laborum suscipit quasi
              assumenda quibusdam ad ex aperiam optio ab veniam? Similique
              dolorum, sint quis esse odio officia maxime, sunt harum deserunt a
              commodi sapiente ut dicta, reiciendis suscipit.
            </p>

            <div className="button-group">
              <button className="comment-button">Comment</button>
              <button className="bookmark-button">Bookmark</button>
            </div>
          </div>

          <img
            src="./src/assets/images/shadow-3.svg"
            width="500"
            height="1500"
            loading="lazy"
            alt="Background Decoration"
            className="feature-bg"
          />
        </section>
      </div>
    </>
  );
};

export default Blogdetails;
