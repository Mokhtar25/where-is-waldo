import { MouseEvent, MouseEventHandler, useRef, useState } from "react";
import Model from "./comp/model";

interface mouseCord {
  page: number;
  offset: number;
}

const App = () => {
  const [x, setX] = useState<mouseCord>();
  const [y, setY] = useState<mouseCord>();
  const [model, setModel] = useState(true);

  const ref = useRef<HTMLImageElement | null>(null);

  const imgClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const e = event.nativeEvent;

    if (!ref.current) return;

    const width = ref.current.width;
    const height = ref.current.height;

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

  return (
    <div className="h-screen w-full">
      <div className="text-secondary">
        hello, world {x?.offset} {y?.offset}
      </div>
      <Model
        open={model}
        style={{ left: `${x?.page}px`, top: `${y?.page}px` }}
      ></Model>
      <img src="/sea.gif" alt="" onClick={imgClick} ref={ref} />
    </div>
  );
};

export default App;
