import { Button } from "@mui/material";

export default function EditForm({
    currentTodo,
    setIsEditing,
    onEditInputChange,
    onEditFormSubmit
}) {
    return (
        <form className="todoform" onSubmit={onEditFormSubmit}>

            {/* <Typography className='todoheading' variant="h5" gutterBottom>Edit Todo</Typography> */}
            {/* <label htmlFor="updateTodo">Update todo: </label> */}
            <div className="todoActionWrapper">
                <div className="todoInputWrapper">
                    <input
                        className="todoInput"
                        name="updateTodo"
                        type="text"
                        placeholder="Update todo"
                        value={currentTodo.text}
                        onChange={onEditInputChange}
                    />
                </div>
                <div className="editformbtngrp">
                    <Button
                        size="medium" className="todobtn"
                        type="submit" onClick={onEditFormSubmit}>
                        Update
                    </Button>
                    <Button
                        size="medium" className="todobtn"
                        onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
            </div>
        </form>
    );
}
