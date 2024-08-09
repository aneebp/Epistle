import React, { useEffect, useState } from "react";
import api from "../api";
import { IoIosArrowBack } from "react-icons/io";
import "../styles/profileediting.css";
import { useNavigate } from "react-router-dom";
import defaultProfileImage from "../assets/images/default-profile.png";
import { ACCESS_TOKEN } from "../constants";

const ProfileEditing = () => {
  const [id, setId] = useState(null);
  const [full_name, setFull_name] = useState("");
  const [image, setImage] = useState(null);
  const [bio, setBio] = useState("");
  const [about, setAbout] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.get("api/user/profile/");
        const Prouser = res.data;
        setId(Prouser.id);
        setFull_name(Prouser.full_name);
        setImage(Prouser.image || defaultProfileImage);
        setBio(Prouser.bio);
        setAbout(Prouser.about);
      } catch (error) {
        console.log("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("full_name", full_name);
    if (image && typeof image === "object") {
      formData.append("image", image);
    }
    formData.append("bio", bio);
    formData.append("about", about);
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      await api.put(`api/user/profile/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/profile/${id}`);
    } catch (error) {
      console.log("Error during updating user profile", error);
    }
  };

  return (
    <div className="start-writing-container">
      <button className="back-button" onClick={() => window.history.back()}>
        <IoIosArrowBack />
      </button>
      <form className="start-writing-form" onSubmit={handleSubmit}>
        <div className="image-upload-section-pro">
          {image ? (
            <img
              src={
                typeof image === "string" ? image : URL.createObjectURL(image)
              }
              alt="Uploaded"
              className="uploaded-image"
            />
          ) : (
            <div className="non-image">
              <img src={defaultProfileImage} alt="Default" />
              <div className="image-placeholder">Upload an image</div>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="image-upload-input"
          />
        </div>
        <input
          type="text"
          placeholder="Name"
          name="full_name"
          className="input-field title-input"
          value={full_name}
          onChange={(e) => setFull_name(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Bio"
          name="bio"
          className="input-field title-input"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />
        <textarea
          placeholder="About"
          name="about"
          className="input-field description-input"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        ></textarea>
        <div className="buttons-container">
          <button type="submit" className="publish-button">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditing;
