import { useState } from "react";

interface mouseCord {
  page: number;
  offset: number;
}

const App = () => {
  const [x, setX] = useState<mouseCord>();
  const [y, setY] = useState<mouseCord>();
  const [model, setModel] = useState(false);

  const handelMouse = (e: MouseEvent) => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // adjust the value to height and length of the screen
    const x = ((width / e.x) * 1000).toFixed(0);
    const y = ((height / e.y) * 1000).toFixed(0);
    setX({
      page: e.pageX,
      offset: parseInt(x),
    });
    setY({
      page: e.pageY,
      offset: parseInt(y),
    });
  };
  document.onmousedown = handelMouse;

  return (
    <>
      <div className="text-secondary">
        hello, world {x?.offset} {y?.offset}
      </div>
      <div
        className={`absolute h-24 w-12 bg-secondary`}
        style={{ left: `${x?.page}px`, top: `${y?.page}px` }}
      ></div>
      <div className="absolute right-2/4 top-2/4 size-1 rounded-full bg-secondary"></div>
    </>
  );
};

export default App;
