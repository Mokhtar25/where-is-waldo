import { forwardRef, useState, useImperativeHandle } from "react";
import { makeBlog } from "../utils/api";
import { BlogItem } from "./Blog";

interface props {
  className: string;
  addItem: (e: BlogItem) => void;
}
const Model = forwardRef(function ({ className, addItem }: props, refs) {
  const [hide, setHide] = useState(true);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  useImperativeHandle(refs, () => {
    return {
      toggelVisibl,
    };
  }, [hide]);
  const toggelVisibl = () => {
    setHide(() => !hide);
  };
  const handelSubmit = async (e: any) => {
    e.preventDefault();
    toggelVisibl();
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
        " absolute inset-16 left-0 right-0 ml-auto mr-auto flex size-96 flex-col gap-4 border-8 border-white text-center" +
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
      <button type="button" onClick={toggelVisibl}>
        cancel
      </button>
    </form>
  );
});
export default Model;
