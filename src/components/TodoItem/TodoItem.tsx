import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  FormCheck,
} from "react-bootstrap";
import { FC } from "react";
import { useActions } from "../../hooks/useActions";
import "./styles.css";

interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
}

const TodoItem: FC<TodoItemProps> = ({ id, title, completed }) => {
  const { setDeleteTodo, setCompletedTodo } = useActions();

  const handleDeleteTodo = () => {
    setDeleteTodo(id);
  };

  const toggleCompleteTodo = () => {
    setCompletedTodo(id);
  };

  return (
    <Card key={id} className=" mb-4">
      <CardHeader
        className={
          completed
            ? "d-flex justify-content-center gap-3 todo-completed"
            : "d-flex justify-content-center gap-3"
        }
      >
        {`${title}`}
        <FormCheck checked={completed} onChange={toggleCompleteTodo} />
      </CardHeader>
      <CardFooter>
        <Button variant="outline-danger" onClick={handleDeleteTodo}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TodoItem;
