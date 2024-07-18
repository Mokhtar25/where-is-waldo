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

  // const ref = useRef<HTMLDivElement | null>(null);
  // const handelMouse = (e: MouseEvent) => {
  //   const bor = ref.current?.getBoundingClientRect();
  //   const width = window.innerWidth;
  //   const height = window.innerHeight;
  //
  //   if (bor) {
  //     if (
  //       e.x <= bor?.width + bor?.x &&
  //       e.x >= bor?.x &&
  //       e.y <= bor?.height + bor?.y &&
  //       e.y >= bor.y
  //     )
  //       return null;
  //   }
  //   // adjust the value to height and length of the screen
  //   const x = ((width / e.x) * 1000).toFixed(0);
  //   const y = ((height / e.y) * 1000).toFixed(0);
  //   setX({
  //     page: e.pageX,
  //     offset: parseInt(x),
  //   });
  //   setY({
  //     page: e.pageY,
  //     offset: parseInt(y),
  //   });
  // };
  // document.onmousedown = handelMouse;

  const imgClick = (event: React.MouseEvent<HTMLImageElement>) => {
    console.log(event.nativeEvent.pageX);
  };

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
      <img src="../public/sea.gif" alt="" onClick={imgClick} />
    </div>
  );
};

export default App;
