import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
const PopularTags = () => {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await api.get("api/category/list/");
        setTopics(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);
  console.log("toô]", topics);
  return (
    <>
      <section className="tags" id="tags" aria-labelledby="tag-label">
        <div className="container">
          <h2 className="headline headline-2 section-title" id="tag-label">
            <span className="span">Popular Tags</span>
          </h2>

          <p className="section-text">Most searched keywords</p>

          <ul className="grid-list">
            {topics.map((topic) => (
              <Link to={`/topic/post/${topic.slug}`}>
                <li key={topic.id}>
                  <button className="card tag-btn">
                    <img
                      src={topic.image}
                      width="32"
                      height="32"
                      loading="lazy"
                      alt="Travel"
                    />

                    <p className="btn-text">{topic.title}</p>
                  </button>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default PopularTags;
