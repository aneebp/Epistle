import React, { useEffect, useState } from "react";
import BPost from "../components/BPost";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import api from "../api";
import Header from "../components/Header";
import BlogPost from "../components/BlogPost";
import Footer from "../components/Footer";

const TopicBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchpost = async () => {
      try {
        const res = await api.get(`api/category/posts/${slug}`);
        setPosts(res.data);
      } catch (error) {
        console.log("error during fetching topic based post", error);
      } finally {
        setLoading(false);
      }
    };
    fetchpost();
  }, [slug]);
  if (posts == 0) {
    return (
      <>
        <Header></Header>
        <section className="section feature" aria-label="feature" id="featured">
          <div style={{ marginTop: 100 }} className="container">
            {loading ? (
              <Spinner loading={loading}></Spinner>
            ) : (
              <h2 className="headline headline-2 section-title">
                No articles published on this topic
              </h2>
            )}
          </div>

          <img
            src="./src/assets/images/shadow-3.svg"
            width="500"
            height="1500"
            loading="lazy"
            alt=""
            className="feature-bg"
          />
        </section>
        <BlogPost></BlogPost>
        <Footer></Footer>
      </>
    );
  }
  return (
    <>
      <Header></Header>
      <section className="section feature" aria-label="feature" id="featured">
        <div style={{ marginTop: 100 }} className="container">
          <h2 className="headline headline-2 section-title">
            <span
              className="span"
              style={{ marginBottom: 50, textTransform: "uppercase" }}
            >
              {slug}
            </span>
          </h2>

          {loading ? (
            <Spinner loading={loading}></Spinner>
          ) : (
            <ul className="feature-list">
              {posts.map((post) => (
                <BPost key={post.id} post={post}></BPost>
              ))}
            </ul>
          )}
        </div>

        <img
          src="./src/assets/images/shadow-3.svg"
          width="500"
          height="1500"
          loading="lazy"
          alt=""
          className="feature-bg"
        />
      </section>
      <Footer></Footer>
    </>
  );
};

export default TopicBlog;
