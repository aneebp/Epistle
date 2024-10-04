import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import { IoIosArrowBack } from "react-icons/io";
import api from "../api";
import { Link, useParams } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import defaultProfileImage from "../assets/images/default-profile.png";

const Profile = () => {
  const [userData, setUserData] = useState(null);
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
    <>
      <div className="header__wrapper">
        <button className="back-button" onClick={() => window.history.back()}>
          <IoIosArrowBack />
        </button>

        <header></header>
        <div className="cols__container">
          <div className="left__col">
            <div className="img__container">
              <img
                src={
                  userData.image == null ? defaultProfileImage : userData.image
                }
                alt=""
              />
            </div>

            <div className="personal_details">
              <div className="p_details">
                <h2>{userData.full_name}</h2>
                <p>{userData.bio}</p>
                <p className="about">{userData.about}</p>
              </div>
            </div>

            {/* Move buttons here */}
            <div className="buttons">
              {userData.email == profileUser.email ? (
                <Link to="/logout">
                  <button className="btn logout-button">Logout</button>
                </Link>
              ) : (
                ""
              )}
              {userData.email == profileUser.email ? (
                <Link to="/profile/update">
                  <button className="btn edit-button">Edit</button>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
