import React, { useState } from "react";
import { Tag } from "antd";
import "./index.less";
import { useSelector, useDispatch } from "react-redux";
import { IStoreState } from "@store/types";
import { useHistory } from "react-router-dom";
import { delAppOpendPage } from "@store/module/app";
import { GPages } from "@typings/app";

const Breadceumb: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [visibleTag, setvisibleTag] = useState<boolean>(true);
  const { opendPagesList } = useSelector((state: IStoreState) => state.app);
  const closeTag = (menu: GPages) => {
    setvisibleTag(false);
    dispatch(delAppOpendPage(menu));
  };

  return (
    <>
      <div className="breadceumb-wrap">
        {opendPagesList.map((menu,index) => (
          <Tag key={index} closable onClose={() => closeTag(menu)} visible={visibleTag}>
            <div
              onClick={() => {
                history.push(menu.path!);
              }}
            >
              {menu.meta.title}
            </div>
          </Tag>
        ))}
      </div>
    </>
  );
};

export default Breadceumb;
