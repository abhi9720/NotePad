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

                        rows={3}
                        max-rows={3}

                        className="todoInput"
                        name="todo"
                        type="text"
                        placeholder="Create new todo"
                        value={todo}
                        onChange={onAddInputChange}
                    />
                </div>
                <Button

                    variant="contained" type="submit" size="xlarge"  >
                    Add
                </Button>
            </div>
        </form>
    );
}
