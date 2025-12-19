import React, { useState } from "react";
import BackBtn from "../../components/backBtn/BackBtn";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const title = formData.get("title").trim();
    const pdf = formData.get("pdf");

    // Append title and link to formData
    formData.append("title", title);


    try {
      // const postResponse = await axios.post(
      //   "https://staffprojectbackend.onrender.com/api/post/addPost",
      //   formData, // Send formData directly
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      const postResponse = await axios.post(
        "http://localhost:8080/api/post/addPost",
        formData, // Send formData directly
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(postResponse);
      setLoading(false);
      toast.success("Post created successfully");
        navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to create post");
    }
  };

  return (
    <div>
      <div className="mt-3"></div>
      <BackBtn />
      <div className="header d-flex flex-column">
        <span className="title-text heading">New Post</span>
        <span className="opacity-75">You can add new post here.</span>
      </div>
      <form onSubmit={handleUpload} className="mt-4 mx-3">
        <label htmlFor="title">Topic Title</label>
        <input
          type="text"
          name="title"
          className="form-control shadow-none mb-2"
          id="title"
          required
        />
        <label htmlFor="pdf">PDF</label>
        <input
          type="file"
          name="pdf"
          className="form-control shadow-none mb-2"
          id="pdf"
          accept="application/pdf"
          required
        />
        <button
          className="uploadBtn btn btn-primary float-end mt-3"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default NewPost;
