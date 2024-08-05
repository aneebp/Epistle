import React, { useEffect, useState } from "react";
import "../styles/blogdetail.css";
import { IoIosArrowBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import BlogPost from "../components/BlogPost";
import Footer from "../components/Footer";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../api";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
const Blogdetails = () => {
  const [postDetails, setPostDetails] = useState(null);
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  const navigate = useNavigate();

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
  const deletehandle = async (slug) => {
    try {
      const res = await api.delete(`api/post/delete/${slug}/`);
      if (res.status === 204) {
        toast.success("Post Deleting...");
        navigate("/");
      } else {
        alert("Failed to delete the task");
      }
    } catch (error) {
      console.log("error deleting post", error);
    }
  };
  useEffect(() => {
    const fetchuser = async () => {
      try {
        const res = await api.get("api/user/profile/");
        setUserData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchuser();
  }, []);

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
                  {userData.id == postDetails.user.id ? (
                    <Link to={`/blogdetail/update/${postDetails.slug}`}>
                      <button className="bookmark-button">
                        <FaEdit />
                      </button>
                    </Link>
                  ) : (
                    ""
                  )}
                  {userData.id == postDetails.user.id ? (
                    <button className="bookmark-button">
                      <MdDelete
                        onClick={() => deletehandle(postDetails.slug)}
                      />
                    </button>
                  ) : (
                    ""
                  )}
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
          <Footer></Footer>
        </>
      )}
    </>
  );
};

export default Blogdetails;
