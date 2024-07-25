import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BPost from "../components/BPost";
import api from "../api";
import Spinner from "../components/Spinner";

const Allblogposts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchposts = async () => {
      try {
        const res = await api.get("api/posts/");
        setPosts(res.data);
      } catch (error) {
        console.log("error occured during fetch the post", error);
      } finally {
        setLoading(false);
      }
    };
    fetchposts();
  }, []);
  return (
    <>
      <Header></Header>
      <section className="section feature" aria-label="feature" id="featured">
        <div style={{ marginTop: 100 }} className="container">
          <h2 className="headline headline-2 section-title">
            <span className="span" style={{ marginBottom: 50 }}>
              Discover Inspiring Stories
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

export default Allblogposts;
