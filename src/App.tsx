import { useRef, useState } from "react";
import Model from "./comp/model";

interface mouseCord {
  page: number;
  offset: number;
}

const App = () => {
  const [x, setX] = useState<mouseCord>();
  const [y, setY] = useState<mouseCord>();
  const [model, setModel] = useState(true);

  const ref = useRef<HTMLDivElement | null>(null);
  const handelMouse = (e: MouseEvent) => {
    const bor = ref.current?.getBoundingClientRect();
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (
      e.x <= bor?.width + bor?.x &&
      e.x >= bor?.x &&
      e.y <= bor?.height + bor?.y &&
      e.y >= bor.y
    )
      return null;
    console.log(bor?.x, e.x, bor?.width, bor?.left, bor?.width + bor?.x);
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
    <div className="h-screen w-full">
      <div className="text-secondary">
        hello, world {x?.offset} {y?.offset}
      </div>
      <Model
        refx={ref}
        open={model}
        style={{ left: `${x?.page}px`, top: `${y?.page}px` }}
      ></Model>
      <div className="absolute right-2/4 top-2/4 size-1 rounded-full bg-secondary"></div>
    </div>
  );
};

export default App;
