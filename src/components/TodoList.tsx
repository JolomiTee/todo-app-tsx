import { Todo } from "../model";
import SingleComponent from "./SingleComponent";

interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>

}

const TodoList: React.FC<Props> = ({todos, setTodos,}) => {
  return (
    <div className="todos">
        {todos.map(todo=>(
            <SingleComponent todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />
        ))}
    </div>
  )
}

export default TodoList