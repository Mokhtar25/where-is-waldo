import React, { MouseEvent } from "react";
interface ModelProps {
  open: boolean;
  style: React.CSSProperties;
  submit: (type: string | null) => void;
}
const Model = ({ open, style, submit }: ModelProps) => {
  if (!open) return null;
  const handelClick = (e: MouseEvent<HTMLDivElement>) => {
    const type = e.currentTarget.textContent;
    submit(type);
  };

  return (
    <div
      style={style}
      className="absolute z-50 flex w-24 flex-col justify-between divide-y-2 divide-white rounded border-4 border-gray-500 bg-slate-700"
    >
      <div
        onClick={handelClick}
        className="flex h-full cursor-pointer flex-col items-center justify-center transition-all hover:bg-slate-600 active:brightness-125"
      >
        <img src="/rabbit.png" className="size-10" />
        <span>rabbit</span>
      </div>

      <div
        onClick={handelClick}
        className="flex h-full cursor-pointer flex-col items-center justify-center transition-all hover:bg-slate-600 active:brightness-125"
      >
        <img src="/wilson.png" className="size-10" />
        <span>wilson</span>
      </div>

      <div
        onClick={handelClick}
        className="flex h-full cursor-pointer flex-col items-center justify-center transition-all hover:bg-slate-600 active:brightness-125"
      >
        <img src="/guyOnBoard.png" className="size-10" />
        <span>board</span>
      </div>
    </div>
  );
};

export default Model;
