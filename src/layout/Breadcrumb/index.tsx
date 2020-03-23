import React from "react";
import { Tag } from "antd";
import "./index.less";

const Breadceumb: React.FC = () => {
  const closeTag = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Clicked! But prevent default.");
  };

  return (
    <>
      <div className="breadceumb-wrap">
        <Tag closable onClose={closeTag}>
          Home
        </Tag>
        <Tag closable onClose={closeTag} visible={false}>
          Todolist
        </Tag>
      </div>
    </>
  );
};

export default Breadceumb;
