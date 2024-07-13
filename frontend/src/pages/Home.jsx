import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import BlogPost from "../components/BlogPost";
import Topics from "../components/Topics";
import PopularTags from "../components/PopularTags";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Header></Header>
      <Hero></Hero>
      <Topics></Topics>
      <BlogPost></BlogPost>
      <PopularTags></PopularTags>
      <Footer></Footer>
    </>
  );
};

export default Home;
