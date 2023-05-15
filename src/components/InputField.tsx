import { useRef } from "react";

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({todo, setTodo, handleAdd}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
	return (
		<form onSubmit={(e) => {
            handleAdd(e)
            inputRef.current?.blur()
        }} className="form">
			<input
                ref={inputRef}
                type="text"
                placeholder="Enter a task" className="input__box"
                value={todo}
                onChange={(e) => setTodo(e.target.value)} />
			<button className="input__button" type="submit" >
				Add
			</button>
		</form>
	);
};

export default InputField;
