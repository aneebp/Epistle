import React from "react";
import { Link } from "react-router-dom";

const BPost = ({ post }) => {
  return (
    <>
      <li>
        <div className="card feature-card">
          <figure
            className="card-banner img-holder"
            style={{ "--width": 1602, "--height": 903 }}
          >
            <img
              src={post.image}
              width="1602"
              height="903"
              loading="lazy"
              alt={post.title}
              className="img-cover"
            />
          </figure>

          <div className="card-content">
            <div className="card-wrapper">
              <div className="card-tag">
                <a href="#" className="span hover-2">
                  #{post.tags}
                </a>

                <a href="#" className="span hover-2">
                  #Lifestyle
                </a>
              </div>

              <div className="wrapper">
                <ion-icon name="time-outline" aria-hidden="true"></ion-icon>

                <span className="span">3 mins read</span>
              </div>
            </div>

            <h3 className="headline headline-3">
              <a href="#" className="card-title hover-2">
                {post.title}
              </a>
            </h3>

            <div className="card-wrapper">
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

              <Link to="/blogdetail" className="card-btn">
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
