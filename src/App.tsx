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
  const cord = [{ x: 10723, y: 9598 }];

  const ref = useRef<HTMLImageElement | null>(null);
  const buffer = 1500;

  const submit = (type: string | null) => {
    if (type === null) return;
    if (!x?.offset || !y?.offset) return;

    const checkX =
      x?.offset <= cord[0].x + buffer && x?.offset >= cord[0].x - buffer;

    const checkY =
      y?.offset <= cord[0].y + buffer && y?.offset >= cord[0].y - buffer;
    if (checkX && checkY) alert("eh");
  };

  const imgClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const e = event.nativeEvent;
    setModel(!model);

    const buffer = 1000;
    if (!ref.current) return;

    const width = ref.current.width;
    const height = ref.current.height;

    const x = ((width / e.x) * buffer).toFixed(0);
    const y = ((height / e.y) * buffer).toFixed(0);
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
        submit={submit}
        open={model}
        style={{ left: `${x?.page}px`, top: `${y?.page}px` }}
      ></Model>
      <img src="/sea.gif" alt="" onClick={imgClick} ref={ref} />
    </div>
  );
};

export default App;
