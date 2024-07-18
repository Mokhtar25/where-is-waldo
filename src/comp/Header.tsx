import React from "react";
const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-24 items-center justify-center bg-zinc-600">
      <span>Where is waldo</span>
      <span>{children}</span>
    </div>
  );
};

export default Header;
