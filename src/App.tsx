import { useEffect, useState } from "react";
import "./App.css";
import Blog from "./comp/Blog";
import { getBlogs, updateItem } from "./utils/api";
import { BlogItem } from "./comp/Blog";
import Model from "./comp/Model";

function App() {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [re, setRe] = useState(0);
  const [hideModal, setHideModal] = useState(false);

  const addNew = () => {
    setHideModal(!hideModal);
  };
  const handelRe = () => {
    setRe(re + 1);
  };

  const addItem = (e: BlogItem) => {
    setItems([...items, e]);
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

      <Model hide={hideModal} addItem={addItem} className="bg-slate-200" />

      <main className="flex min-h-96 flex-wrap items-center gap-2">
        {items.map((e: BlogItem) => (
          <Blog key={e.id} blogItem={e} handelLike={handelLike} />
        ))}
      </main>

      <button onClick={handelRe}>refersh</button>
      <button onClick={addNew}>ADD NEW</button>
    </>
  );
}

export default App;
