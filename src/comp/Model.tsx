import React, { useState } from "react";
import { makeBlog } from "../utils/api";
import { BlogItem } from "./Blog";

interface props {
  hide: boolean;
  className: string;
  addItem: (e: BlogItem) => void;
}
export default function Model({ hide, className, addItem }: props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handelSubmit = async (e: any) => {
    e.preventDefault();
    const item: BlogItem = {
      id: "",
      title: title,
      likes: 0,
      url: url,
      author: author,
    };
    const news = await makeBlog(item);
    if (news.error) return setError(news.error);
    addItem(news);
  };

  return (
    <form
      className={
        className +
        " flex size-96 flex-col gap-4 border-8 border-white" +
        (hide ? " hidden" : "")
      }
      onSubmit={(e) => handelSubmit(e)}
    >
      <h3 className="text-black">Add new Blog</h3>
      <h2 className="text-xl text-red-600">{error}</h2>
      <input
        type="text"
        placeholder="title of blog"
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="url"
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
