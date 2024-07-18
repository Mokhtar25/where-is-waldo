import React from "react";
interface ModelProps {
  open: boolean;
  style: React.CSSProperties;
}
const Model = ({ open, style }: ModelProps) => {
  if (!open) return null;
  return (
    <div
      style={style}
      className="absolute z-50 flex h-32 w-24 flex-col justify-between divide-y-2 divide-white bg-slate-700"
    >
      <div>11</div>
      <div>21</div>
      <div>31</div>
    </div>
  );
};

export default Model;
