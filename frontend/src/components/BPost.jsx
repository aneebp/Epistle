import React from "react";
import { Link } from "react-router-dom";

const BPost = ({ post }) => {
  return (
    <>
      <li key={post.id}>
        <div className="card feature-card">
          <figure
            className="card-banner img-holder"
            style={{ "--width": 1602, "--height": 903 }}
          >
            <Link to={`/blogdetail/${post.slug}`}>
              <img
                src={post.image}
                width="1602"
                height="903"
                loading="lazy"
                alt={post.title}
                className="img-cover"
              />
            </Link>
          </figure>

          <div className="card-content">
            <div className="card-wrapper">
              <div className="card-tag">
                {post.tags.split(",").map((tag, index) => (
                  <a key={index} href="#" className="tags-a span hover-2">
                    #{tag.trim()}
                  </a>
                ))}
              </div>
            </div>

            <h3 className="headline headline-3">
              <Link
                to={`/blogdetail/${post.slug}`}
                className="card-title hover-2"
              >
                {post.title}
              </Link>
            </h3>

            <div className="card-wrapper">
              <Link to={`/profile/${post.user.id}`}>
                <div className="profile-card">
                  {post.profile && post.profile.image && (
                    <img
                      src={post.profile.image}
                      width="48"
                      height="48"
                      loading="lazy"
                      alt="Joseph"
                      className="profile-banner"
                    />
                  )}

                  <div>
                    <p className="card-title">{post.user.full_name}</p>

                    <p className="card-subtitle">{post.formatted_date}</p>
                  </div>
                </div>
              </Link>

              <Link to={`/blogdetail/${post.slug}`} className="card-btn">
                Read more
              </Link>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default BPost;
