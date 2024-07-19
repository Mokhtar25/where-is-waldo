import React, { useEffect, useState } from "react";

const Header = ({
  children,
  gameOver,
}: {
  children: React.ReactNode;
  gameOver: boolean;
}) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    //Implementing the setInterval method
    if (gameOver) return;
    const interval = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 10);

    return () => clearInterval(interval);
  }, [gameOver]);

  return (
    <div className="flex h-16 items-center justify-center bg-zinc-600">
      <span className="text-3xl">Where is Waldo</span>
      {children}

      <span className="ml-4 size-4">{timer / 100}</span>
    </div>
  );
};

export default Header;
