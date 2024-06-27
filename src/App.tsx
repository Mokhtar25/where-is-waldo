import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Blog from "./comp/Blog";
import { getBlogs, updateItem } from "./utils/api";
import { BlogItem } from "./comp/Blog";

function App() {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [re, setRe] = useState(0);

  const handelRe = () => {
    setRe(re + 1);
  };
  useEffect(() => {
    getBlogs().then((re) => setItems(re));
  }, [re]);
  const handelLike = async (item: BlogItem) => {
    const newItem = { ...item, likes: item.likes + 1 };
    const res: BlogItem = await updateItem(newItem);
    setItems(items.map((e) => (e.id === res.id ? res : e)));
  };
  return (
    <>
      <nav className="h-8 w-full text-xl">Hello</nav>
      {items.map((e: BlogItem) => (
        <Blog key={e.id} blogItem={e} handelLike={handelLike} />
      ))}
      <button onClick={handelRe}>refersh</button>
    </>
  );
}

export default App;
