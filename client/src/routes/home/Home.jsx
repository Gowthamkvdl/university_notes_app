import React, { Suspense, useState, useEffect } from "react";
import "./home.css";
import Card from "../../components/card/Card";
import logo from "../../assets/logo.png";
import { useLoaderData, Await } from "react-router-dom";
import CardSkeleton from "../../components/skeletonCard/SkeletonCard";

const Home = () => {
  const posts = useLoaderData();
  const [searchInput, setSearchInput] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);


  // Filter posts based on search input
  useEffect(() => {
    const filtered = allPosts.filter((post) =>
      post.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    console.log(searchInput)
    setFilteredPosts(filtered);
  }, [searchInput, allPosts]);

  return (
    <div>
      <div className="header pt-2 d-flex gap-2 justify-content-center align-items-center">
        <div className="logo d-md-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
          </svg>
        </div>
        <div className="text">
          <h1 className="title-text d-md-none mb-0 mt-3 heading">
            University Notes
          </h1>
          <p className="mt-0 d-md-none">By Gowtham</p>
        </div>
      </div>
      <hr className="w-75 mx-auto d-md-none" />
      <div className="searchBox d-flex align-items-center justify-content-center pt-2 pt-md-4">
        <div className="container-input">
          <input
            type="text"
            placeholder="Search Topics"
            name="text"
            className="input box-shadow"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <svg
            fill="#000000"
            width="20px"
            height="20px"
            viewBox="0 0 1920 1920"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="listingSection mt-3">
        <div className="subtitle-text opacity-75">
          <span>What's New?</span>
        </div>
        <div className="cards">
          <Suspense
            fallback={
              <div>
                <CardSkeleton NoOfCards={8} />
              </div>
            }
          >
            <Await
              resolve={posts.postsResponse}
              errorElement={
                <div>
                  {/* Handle error appropriately */}
                  <p>Error loading posts.</p>
                </div>
              }
            >
              {(resolvedPosts) => {
                setAllPosts(resolvedPosts.data);
                return filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <Card post={post} key={post.id} />
                  ))
                ) : (
                  <p>No posts found.</p>
                );
              }}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;
