import React, { useState } from "react";
import "../styles/writing.css";

const StartWriting = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handlePublish = (e) => {
    e.preventDefault();

    console.log({ title, description, image });
  };

  return (
    <div className="start-writing-container">
      <div className="image-upload-section">
        {image ? (
          <img src={image} alt="Uploaded" className="uploaded-image" />
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
      <form className="start-writing-form" onSubmit={handlePublish}>
        <input
          type="text"
          placeholder="Blog title..."
          className="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Start writing here..."
          className="description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <div className="buttons-container">
          <button type="submit" className="publish-button">
            Publish
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default StartWriting;
