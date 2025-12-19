import React, { useEffect } from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";


const Navbar = () => {

  const location = useLocation();

  useEffect(() => {
    const sideParts = document.querySelectorAll(".sidePart");
    const navbar = document.querySelector(".navbar");

    const handleScroll = () => {
      sideParts.forEach((sidePart) => {
        if (window.innerWidth > 768) {
          if (window.scrollY > 80) {
            sidePart.classList.remove("d-md-block");
            sidePart.classList.add("d-none"); // Add 'd-none' class to hide when scrolled down more than 100px
            navbar.classList.remove("justify-content-md-between");
          } else {
            sidePart.classList.add("d-md-block");
            sidePart.classList.remove("d-none"); // Remove 'd-none' to show when scrolled back up
            navbar.classList.add("justify-content-md-between");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "",
          duration: 4000,
          success: {
            duration: 2000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <nav className="navbar mt-3 container navbar-expand d-flex align-items-center justify-content-md-between justify-content-center">
        <div className="touristBus d-none  d-md-block sidePart">
          <h1 className="title-text"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-book me-1" viewBox="0 0 16 16">
            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
          </svg>University Notes</h1>
        </div>
        <div className="">
          <div
            className="collapse me-4 pb-0 fw-bold navbar-collapse box-shadow px-3 rounded-4"
            id="navbarNav"
          >
            <ul className="navbar-nav d-flex align-items-center ">
              <li className="nav-item ">
                <Link className="link" to="/">
                  <a
                    className={`nav-link d-flex flex-column align-items-center ${isActive(
                      "/"
                    )}`}
                    href="#"
                  >
                    <span className="material-symbols-outlined  d-md-none mb-0 title-text">
                      home
                    </span>
                    <span className="d-none  d-md-block">Home</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="link" to={"/upload"}>
                  <a
                    className={`nav-link d-flex flex-column align-items-center ${isActive(
                      "/profile" 
                    )} ${isActive("/upload")}`}
                    href="#"
                  >
                    <span className="material-symbols-outlined  d-md-none mb-0 title-text">
                      person
                    </span>
                    <span className="d-none d-md-block ">Upload</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
