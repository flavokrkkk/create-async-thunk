import { ChangeEvent, FC } from "react";
import { Button, FormControl } from "react-bootstrap";

interface InputFieldProps {
  value: string;
  handleChangeEvent: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAddTodo: () => void;
}

const InputField: FC<InputFieldProps> = ({
  value,
  handleAddTodo,
  handleChangeEvent,
}) => {
  return (
    <label className=" d-flex flex-column gap-4">
      <FormControl
        placeholder="New Todo..."
        value={value}
        onChange={handleChangeEvent}
      />
      <Button onClick={handleAddTodo}>Add Todo</Button>
    </label>
  );
};

export default InputField;
