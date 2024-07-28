import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import { IoIosArrowBack } from "react-icons/io";
import api from "../api";
import { Link, useParams } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";

const Profile = () => {
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);
  const [profileUser, setProfileUser] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await api.get(`api/user/profile/${id}`);
        setUserData(res.data);
      } catch (error) {
        console.log("error fetching profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, [id]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await api.get("api/user/profile/");
        setProfileUser(res.data);
      } catch (error) {
        console.log("error during the userfetching", error);
      }
    };
    fetchdata();
  }, []);

  if (!userData) {
    return <h2>No User </h2>;
  }
  return (
    <div className="profile-container">
      <button className="back-button" onClick={() => window.history.back()}>
        <IoIosArrowBack />
      </button>
      <div className="profile-header">
        <img
          src={
            userData
              ? userData.image
              : "./src/assets/images/default-profile.png"
          }
          alt="Profile"
          className="profile-image"
        />
        <h1 className="profile-name">{userData.full_name}</h1>
        <button className="follow-button">Follow</button>
        <div className="social-buttons">
          {userData.instagram && (
            <a
              href={userData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-button instagram-button"
            >
              <img src="./src/assets/images/insta.png" alt="Instagram" />
            </a>
          )}
          {userData.twitter && (
            <a
              href={userData.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="social-button twitter-button"
            >
              <img src="./src/assets/images/x.png" alt="Twitter" />
            </a>
          )}
        </div>
        {userData.id === profileUser.id && (
          <Link to="/logout">
            {" "}
            <button className="btn logout-button">Logout</button>
          </Link>
        )}
      </div>
      <div className="profile-about">
        <p>{userData.about}</p>
      </div>
    </div>
  );
};

export default Profile;
