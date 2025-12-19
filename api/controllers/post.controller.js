import prisma from "../lib/prisma.js";

export const addPost = async (req, res) => {
  const title = req.body.title[0];
  const uploadedFiles = req.files; // Access the uploaded file

  console.log(uploadedFiles);
  console.log(uploadedFiles.pdf[0].filename);
  try {
    await prisma.post.create({
      data: {
        title: title,
        pdf: uploadedFiles.pdf[0].filename,
      },
    });
    res.status(200).json({ message: "Post Uploaded" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to upload post" });
  }
};

export const getPost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: {
        postId: postId,
      },
    });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const title = req.body.title[0];
  const link = req.body.link[0];
  const important = req.body.important;
  const uploadedFiles = req.files;

  console.log(title, link, important, req.body);

  try {
    const updatedData = {
      title: title,
      link: link,
      important: important === "on" ? true : false,
    };

    if (uploadedFiles) {
      if (uploadedFiles.pdf) {
        updatedData.pdf = uploadedFiles.pdf[0].filename;
      }
      if (uploadedFiles.thumbnail) {
        updatedData.thumbnail = uploadedFiles.thumbnail[0].filename;
      }
    }

    const updatedPost = await prisma.post.update({
      where: { postId: postId },
      data: updatedData,
    });

    res.status(200).json({ message: "Post Updated", post: updatedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id; // Get the postId from URL parameters
  console.log(req.params); // Log the entire params object

  try {
    await prisma.post.delete({
      where: { postId: postId }, // Make sure to match the correct field
    });

    res.status(200).json({ message: "Post Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete post" });
  }
};

  