import { ChangeEventHandler, useState } from "react";
import InputField from "../components/InputField/InputField";
import TodoItem from "../components/TodoItem/TodoItem";
import { useAppSelector } from "../hooks/useAppSelector";
import { TodoSelectors } from "../store/selectors";
import { useActions } from "../hooks/useActions";
import { Container } from "react-bootstrap";

const TodoPage = () => {
  const [title, setTitle] = useState("");

  const { todos } = useAppSelector(TodoSelectors);

  const { setTodo } = useActions();

  const handleAddTodo = () => {
    if (title) {
      setTodo(title);
      setTitle("");
    }
  };

  const handleChangeEvent: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.target.value);
  };

  return (
    <Container className="text-center">
      <InputField
        value={title}
        handleAddTodo={handleAddTodo}
        handleChangeEvent={handleChangeEvent}
      />
      {todos.map((todo) => (
        <TodoItem {...todo} key={todo.id} />
      ))}
    </Container>
  );
};

export default TodoPage;
