import { ChangeEventHandler, useEffect, useState } from "react";
import InputField from "../components/InputField/InputField";
import TodoItem from "../components/TodoItem/TodoItem";
import { useAppSelector } from "../hooks/useAppSelector";
import { TodoSelectors } from "../store/selectors";
import { useActions } from "../hooks/useActions";
import { Container } from "react-bootstrap";

const TodoPage = () => {
  const [title, setTitle] = useState("");

  const { todos, loading, error } = useAppSelector(TodoSelectors);
  const { setAsyncTodos, fetchTodos } = useActions();

  const handleAddTodo = () => {
    if (title) {
      setAsyncTodos(title);
      setTitle("");
    }
  };

  const handleChangeEvent: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.target.value);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Container className="text-center">
      <InputField
        value={title}
        handleAddTodo={handleAddTodo}
        handleChangeEvent={handleChangeEvent}
      />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        todos.map((todo) => <TodoItem {...todo} key={todo.id} />)
      )}
      {error && <h1>{error}</h1>}
    </Container>
  );
};

export default TodoPage;
