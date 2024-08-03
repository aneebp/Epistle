import React, { useState, useEffect } from "react";
import "../styles/writing.css";
import { IoIosArrowBack } from "react-icons/io";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";
import { useNavigate, useParams } from "react-router-dom";

const Blogupdate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Active");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    const fetchpostdetails = async () => {
      try {
        const res = await api.get(`api/post/details/${slug}`);
        const postdetails = res.data;
        setTitle(postdetails.title);
        setDescription(postdetails.description);
        setImage(postdetails.image);
        setTags(postdetails.tags);
        setCategory(postdetails.category.id);
        setStatus(postdetails.status);
      } catch (error) {
        console.log(error);
      }
    };
    fetchpostdetails();
  }, [slug]);

  useEffect(() => {
    // Fetch categories data
    const fetchCategories = async () => {
      try {
        const response = await api.get("api/category/list/");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image && typeof image === "object") {
      formData.append("image", image);
    }
    formData.append("tags", tags);
    formData.append("category", category);
    formData.append("status", status);

    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      await api.put(`api/post/details/${slug}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      navigate(`/blogdetail/${slug}`);
    } catch (error) {
      console.log(error.response.data);
      setError(
        "Error occurred when updating post: " +
          JSON.stringify(error.response.data)
      );
    }
  };

  return (
    <div className="start-writing-container">
      <button className="back-button" onClick={() => window.history.back()}>
        <IoIosArrowBack />
      </button>
      <form className="start-writing-form" onSubmit={handleUpdate}>
        {error && <p className="error-message">{error}</p>}
        <div className="image-upload-section-writting">
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
              <img src="./src/assets/images/upload.png" alt="" />
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
          placeholder="Blog Title..."
          className="input-field title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Start Writing Here..."
          className="input-field description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Tags..."
          className="input-field"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
        />
        <select
          className="select-field"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>
        <select
          className="select-field"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Draft">Draft</option>
          <option value="Disabled">Disabled</option>
        </select>
        <div className="buttons-container">
          <button type="submit" className="publish-button">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default Blogupdate;
