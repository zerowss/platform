import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Row, Col, Button } from "antd";
import { IStoreState } from "../../store/types";
import "./index.less";
import { addTodo } from "../../store/module/todolist";
const TodoList: React.FC = props => {
  const todos = useSelector((state: IStoreState) => state.todos);
  const dispath = useDispatch();
  const [iptVal, setIptVal] = useState('');
  const addList = () => {
    const action = addTodo(iptVal);
    dispath(action);
  };

  return (
    <div className="todolist-wrap">
      <Row gutter={[16, 16]}>
        <Col flex="auto">
          <Input
            onChange={e => setIptVal(e.target.value)}
            placeholder="添加待办事件"
            value={iptVal}
          />
        </Col>
        <Col flex="100px">
          <Button onClick={addList} type="primary">
            Button
          </Button>
        </Col>
      </Row>
      <div>
        <ul>
          {todos.map((list,index) => (
            <li key={index}>{list.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
