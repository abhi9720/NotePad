import { Button } from '@mui/material';

export default function AddTodoForm({
    todo,
    onAddFormSubmit,
    onAddInputChange
}) {
    return (
        <form className="todoform" onSubmit={onAddFormSubmit}>

            {/* <Typography className='todoheading' variant="h5" gutterBottom>Add Todo</Typography> */}

            <div className="todoActionWrapper">
                <div className="todoInputWrapper">
                    <textarea
                        max-rows={3}
                        rows={1}

                        className="todoInput"
                        name="todo"
                        type="text"
                        placeholder="Create new todo"
                        value={todo}
                        onChange={onAddInputChange}
                    />
                </div>
                <Button type="submit" size="medium" className="todobtn" >
                    Add
                </Button>
            </div>
        </form>
    );
}
