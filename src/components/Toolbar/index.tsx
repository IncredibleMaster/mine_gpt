import React from "react";
import "./Toolbar.css";

type Props = {
  title: string;
};
export default function Toolbar(props: Props) {
  const { title } = props;
  return (
    <div className="toolbar">
      <h1 className="toolbar-title">{title}</h1>
    </div>
  );
}
