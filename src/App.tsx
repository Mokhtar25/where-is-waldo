import { FormEvent, useEffect, useState, useRef, ReactNode } from "react";
import "./App.css";
import Blog from "./comp/Blog";
import { getBlogs, updateItem } from "./utils/api";
import { BlogItem } from "./comp/Blog";
import Model from "./comp/Model";
import { logIn } from "./utils/login";
import { setToken } from "./utils/api";

type Handelr = {
  toggelVisibl: () => void;
};

function App() {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [re, setRe] = useState(0);
  const refModal = useRef<Handelr>(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const addNew = () => {
    refModal.current?.toggelVisibl();
  };
  const handelRe = () => {
    setRe(re + 1);
  };

  const addItem = (e: BlogItem) => {
    refModal.current?.toggelVisibl();

    setItems([...items, e]);
  };
  useEffect(() => {
    async function fetchMyAPI() {
      const items: BlogItem[] = await getBlogs();
      items.sort((a, b) => (a.likes > b.likes ? -1 : 1));
      setItems(items);

      const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        if (user) {
          setUser(user);
          setToken(user.token);
        } else {
          window.localStorage.removeItem("loggedBlogAppUser");
        }
      }
    }
    fetchMyAPI();
  }, [re]);
  const handelLike = async (item: BlogItem) => {
    const newItem = { ...item, likes: item.likes + 1 };
    const res: BlogItem = await updateItem(newItem);
    setItems(items.map((e) => (e.id === res.id ? res : e)));
  };

  const login = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await logIn({ username, password });

      setToken(data.token);
      setUser(data);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(data));

      setUsername("");
      setPassword("");
    } catch (error) {
      setError("Invalid password or username");

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      <nav className="h-8 w-full text-xl">Hello</nav>
      <button onClick={handelRe}>Refresh</button>
      <button onClick={addNew}>ADD NEW</button>

      {!user && (
        <form onSubmit={login}>
          <div className="flex">
            <label>username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex">
            <label>password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit"> log in</button>
        </form>
      )}
      <Model addItem={addItem} ref={refModal} className="bg-neutral-300" />

      <main className="flex min-h-96 flex-wrap items-center gap-2">
        {items.map((e: BlogItem) => (
          <Blog key={e.id} blogItem={e} handelLike={handelLike} />
        ))}
      </main>
    </>
  );
}

export default App;
