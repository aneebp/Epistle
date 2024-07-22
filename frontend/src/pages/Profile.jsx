import React from "react";
import "../styles/profile.css";
import { IoIosArrowBack } from "react-icons/io";

const Profile = () => {
  return (
    <div className="profile-container">
      <button className="back-button" onClick={() => window.history.back()}>
        <IoIosArrowBack />
      </button>
      <div className="profile-header">
        <img
          src="./src/assets/images/author-6.png"
          alt="Profile"
          className="profile-image"
        />
        <h1 className="profile-name">John Doe</h1>
        <button className="follow-button">Follow</button>
        <div className="social-buttons">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button instagram-button"
          >
            <img src="./src/assets/images/insta.png" alt="Instagram" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button twitter-button"
          >
            <img src="./src/assets/images/x.png" alt="Twitter" />
          </a>
        </div>
      </div>
      <div className="profile-about">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
          quis sem at nibh elementum imperdiet.
        </p>
      </div>
    </div>
  );
};

export default Profile;
