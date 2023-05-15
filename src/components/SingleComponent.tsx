import { Todo } from "../model";
import { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
type Props = {
	todo: Todo;
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleComponent = ({ todo, todos, setTodos }: Props) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [editTodo, setEditTodo] = useState<string>(todo.todo);

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
	return (
		<div>
			<form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
				{edit ? (
					<input
						title="Todo"
						value={todo.todo}
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
		</div>
	);
};

export default SingleComponent;
