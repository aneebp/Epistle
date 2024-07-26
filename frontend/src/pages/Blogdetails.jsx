import React, { useEffect, useState } from "react";
import "../styles/blogdetail.css";
import { IoIosArrowBack } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";
import { IoIosBookmark } from "react-icons/io";
import Header from "../components/Header";
import BlogPost from "../components/BlogPost";
import Footer from "../components/Footer";
import api from "../api";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
const Blogdetails = () => {
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchdata = await api.get(`api/post/details/${slug}`);
        setPostDetails(fetchdata.data);
      } catch (error) {
        console.log("error during fetching post details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);
  return (
    <>
      {loading ? (
        <Spinner loading={loading}></Spinner>
      ) : (
        <>
          <div className="blog-detail">
            {/* Back Button */}
            <Link to="/blogposts">
              <button className="back-button">
                <IoIosArrowBack />
              </button>
            </Link>

            <div className="blog-header">
              <img
                src={postDetails.image}
                alt="Blog Header"
                className="blog-header-image"
              />
            </div>

            {/* Blog Content Section */}
            <section
              className="section feature"
              aria-label="feature"
              id="featured"
            >
              <div className="container">
                <h2 className="headline headline-2 section-title">
                  <span className="span">{postDetails.title}</span>
                </h2>

                <p className="section-text">
                  Published at - {postDetails.formatted_date}
                </p>

                <p className="blog-description">{postDetails.description}</p>

                <div className="button-group">
                  <button className="like-button">
                    <FaHeart></FaHeart>
                  </button>
                  <button className="comment-button">
                    <FaComment></FaComment>
                  </button>
                  <button className="bookmark-button">
                    <IoIosBookmark />
                  </button>
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
          <div className="blog-posts">
            <BlogPost />
          </div>
        </>
      )}
    </>
  );
};

export default Blogdetails;
