import * as React from "react";
import { Spin } from "antd";

interface RLoadingProps {
  size?: "small" | "default" | "large";
}

const Loading: React.FC<RLoadingProps> = props => {
  const { size = "default" } = props;
  return (
    <div
      style={{
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Spin size={size} />
    </div>
  );
};
export default Loading;
