import { ITodos } from "../../models/ITodos";

export interface TodosState {
  todos: ITodos[];
  loading: boolean;
  error: string | unknown;
}
