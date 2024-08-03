import React, { useEffect, useState } from "react";
import api from "../api";
import { IoIosArrowBack } from "react-icons/io";
import "../styles/profileediting.css";
import { useNavigate } from "react-router-dom";

const ProfileEditing = () => {
  const [userData, setUserData] = useState({
    id: "",
    full_name: "",
    email: "",
    image: null,
    bio: "",
    about: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUserData((prevData) => ({
        ...prevData,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const [postDetails, setPostDetails] = useState({
    title: "",
    description: "",
    image: "",
    tags: "",
    category: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in userData) {
      if (userData[key] !== null) {
        formData.append(key, userData[key]);
      }
    }

    try {
      await api.put(`api/user/profile/${userData.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/profile/${userData.id}`);
    } catch (error) {
      console.log("Error during updating user profile", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.get("api/user/profile/");
        setUserData(res.data);
        setImagePreview(res.data.image);
      } catch (error) {
        console.log("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="start-writing-container">
      <button className="back-button" onClick={() => window.history.back()}>
        <IoIosArrowBack />
      </button>
      <form className="start-writing-form" onSubmit={handleSubmit}>
        <div className="image-upload-section-pro">
          {imagePreview ? (
            <img src={imagePreview} alt="Profile" className="uploaded-image" />
          ) : (
            <div className="non-image">
              <img
                src="./src/assets/images/default-profile.png"
                alt="Default Profile"
              />
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
          value={userData.full_name || ""}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          placeholder="Bio"
          name="bio"
          className="input-field title-input"
          value={userData.bio || ""}
          onChange={handleInputChange}
          required
        />
        <textarea
          placeholder="About"
          name="about"
          className="input-field description-input"
          value={userData.about || ""}
          onChange={handleInputChange}
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
