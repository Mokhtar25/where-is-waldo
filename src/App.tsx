import { useRef, useState } from "react";
import TargetIcon from "./assets/target.svg";
import Model from "./comp/model";
import Header from "./comp/Header";
import Won from "./comp/Won";

interface mouseCord {
  page: number;
  offset: number;
}

interface Targets {
  offsetY: number;
  offsetX: number;
}

interface TargetCords {
  x: number;
  y: number;
  type: string;
  found: boolean;
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const [targets, setTargets] = useState<Targets[]>([]);
  const [x, setX] = useState<mouseCord>();
  const [y, setY] = useState<mouseCord>();
  const [model, setModel] = useState(false);
  const [cord, setCord] = useState<TargetCords[]>([
    { x: 10471, y: 14849, type: "board", found: false },
    { type: "wilson", x: 3213, y: 1546, found: false },
    { type: "rabbit", x: 1261, y: 3148, found: false },
  ]);

  const gameOver = cord.filter((e) => e.found === true).length === 3;
  console.log(gameOver);

  const ref = useRef<HTMLImageElement | null>(null);

  const addTarget = (offsetX: number, offsetY: number) => {
    console.log("added");
    setTargets([...targets, { offsetY, offsetX }]);
  };

  // prevent clicking again when target is found
  const submit = (type: string | null) => {
    if (type === null) return;
    if (!x?.offset || !y?.offset) return;

    const cords = cord.find((e) => e.type === type);
    if (!cords) {
      console.log(cords, type, cord);
      return;
    }
    if (cords.found === true) return;

    // adding buffer, sometimes the cords are vastly different so this adjusts it
    const bufferX = cords.x / 20;
    const bufferY = cords.y / 20;
    const checkX =
      x?.offset <= cords.x + bufferX && x?.offset >= cords.x - bufferX;

    const checkY =
      y?.offset <= cords.y + bufferY && y?.offset >= cords.y - bufferY;
    if (checkX && checkY) {
      // some values to make target correct
      console.log(checkY, checkY, cords);
      setCord(cord.map((e) => (e.type === type ? { ...e, found: true } : e)));
      addTarget(x.page - 10, y.page - 8);
    }
  };

  const imgClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const e = event.nativeEvent;
    setModel(!model);

    const buffer = 1000;
    if (!ref.current) return;

    const width = ref.current.width;
    const height = ref.current.height;

    const x = ((width / e.offsetX) * buffer).toFixed(0);
    const y = ((height / e.offsetY) * buffer).toFixed(0);
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
      {targets.map((e) => (
        <img
          className="absolute size-6"
          key={e.offsetX}
          style={{ left: e.offsetX, top: e.offsetY }}
          src={TargetIcon}
        />
      ))}
      {gameOver && <Won />}
      <Header>{null}</Header>
      {!gameOver && (
        <Model
          submit={submit}
          open={model}
          style={{ left: `${x?.page}px`, top: `${y?.page}px` }}
        ></Model>
      )}
      {loading && (
        <span className="animate-ping px-4 text-3xl">loading...</span>
      )}
      <img
        onLoad={() => setLoading(false)}
        src="/sea.gif"
        className={"mx-auto mt-8 " + (loading && "hidden")}
        alt=""
        onClick={imgClick}
        ref={ref}
      />
    </div>
  );
};

export default App;
