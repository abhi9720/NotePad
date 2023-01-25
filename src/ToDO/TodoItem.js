import ModeEditIcon from '@mui/icons-material/ModeEdit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IconButton } from '@mui/material';
export default function TodoItem({
    todo,
    onEditClick,
    onDeleteClick
}) {
    return (
        <li className="todoItem" key={todo.id}>
            <div className="todoItemWrapper">
                <div className="todoItemText">
                    {todo.text}
                </div>
                <div className="todoItemAction">
                    <IconButton onClick={() => onEditClick(todo)}>

                        <ModeEditIcon></ModeEditIcon>
                    </IconButton>
                    <IconButton onClick={() => onDeleteClick(todo.id)}>
                        <HighlightOffIcon></HighlightOffIcon>
                    </IconButton>
                </div>
            </div>
        </li>
    );
}
