import React, { ReactNode } from "react";
type ButtonMode = "solid" | "dashed" | "outline";

type Props = {
  children: ReactNode;
  height?: string;
  width?: string;
  mode: ButtonMode;
  className: string;
  createBtn: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function CustomBtn({
  children,
  height = "h-auto",
  width = "w-auto",
  mode,
  className,
  createBtn,
}: Props) {
  const modeClasses = {
    solid: "border-2 border-transparent cursor-pointer",
    dashed: "border-2 border-dashed cursor-pointer",
    outline: "border-2 cursor-pointer",
  };
  return (
    <button
      className={`rounded-lg px-4 py-2 h-${height} w-${width} ${modeClasses[mode]} ${className}`}
      onClick={createBtn}
    >
      {children}
    </button>
  );
}
