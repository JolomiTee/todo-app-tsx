import { Todo } from "../model";
import { useRef, useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";

type Props = {
    index: number
	todo: Todo;
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleComponent = ({ index, todo, todos, setTodos }: Props) => {

    //* States
	const [edit, setEdit] = useState<boolean>(false);
	const [editTodo, setEditTodo] = useState<string>(todo.todo);

    //* Event Handlers
	const handleDone = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
			)
		);
	};
	const handleDelete = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};
	const handleEdit = (e: React.FormEvent, id: number) => {
		e.preventDefault();

		setTodos(
			todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
		);
		setEdit(false);
	};
    const singleInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      singleInputRef.current?.focus()

    }, [edit])


    //? Component
	return (
		<Draggable draggableId={todo.id.toString()} index={index}
        >
            {(provided, snapshot)=> (
                <form className={`todos__single ${snapshot.isDragging ? 'drag': ''}`} onSubmit={(e) => handleEdit(e, todo.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    {edit ? (
                        <input
                            ref={singleInputRef}
                            title="Todo"
                            value={editTodo}
                            onChange={(e) => setEditTodo(e.target.value)}
                            className="todos__single--text"
                        />
                    ) : todo.isDone ? (
                        <s className="todos__single--text">{todo.todo}</s>
                    ) : (
                        <span className="todos__single--text">{todo.todo}</span>
                    )}

                    <div className="icons">
                        <span
                            className="icon"
                            onClick={() => {
                                if (!edit && !todo.isDone) {
                                    setEdit(!edit);
                                }
                            }}
                        >
                            <AiFillEdit />
                        </span>
                        <span className="icon" onClick={() => handleDelete(todo.id)}>
                            <AiFillDelete />
                        </span>
                        <span className="icon" onClick={() => handleDone(todo.id)}>
                            <MdDone />
                        </span>
                    </div>
                </form>

            )}
		</Draggable>
	);
};

export default SingleComponent;
