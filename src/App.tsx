import { useState } from "react";

const App = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handelMouse = (e: MouseEvent) => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const x = width / e.x;
    const y = height / e.y;
    setX(x);
    setY(y);
  };
  document.onmousedown = handelMouse;

  return (
    <>
      <div className="text-secondary">
        hello, world {x} {y}
      </div>
      <div className="absolute right-2/4 top-2/4 size-2 rounded-full bg-secondary"></div>
    </>
  );
};

export default App;
