import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";
import EditForm from "./EditForm";
import "./todo.css";
import { Typography } from "@mui/material";

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink } from "react-router-dom";


import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


export default function Todo() {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            return JSON.parse(savedTodos);
        } else {
            return [];
        }
    });
    const [todo, setTodo] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({});

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    function handleAddInputChange(e) {
        setTodo(e.target.value);
    }

    function handleEditInputChange(e) {
        setCurrentTodo({ ...currentTodo, text: e.target.value });
        console.log(currentTodo);
    }

    function handleAddFormSubmit(e) {
        e.preventDefault();

        if (todo !== "") {
            setTodos([
                ...todos,
                {
                    id: new Date(),
                    text: todo.trim()
                }
            ]);
        }

        setTodo("");
    }

    function handleEditFormSubmit(e) {
        e.preventDefault();

        handleUpdateTodo(currentTodo.id, currentTodo);
    }

    function handleDeleteClick(id) {
        const removeItem = todos.filter((todo) => {
            return todo.id !== id;
        });
        setTodos(removeItem);
    }

    function handleUpdateTodo(id, updatedTodo) {
        const updatedItem = todos.map((todo) => {
            return todo.id === id ? updatedTodo : todo;
        });
        setIsEditing(false);
        setTodos(updatedItem);
    }

    function handleEditClick(todo) {
        setIsEditing(true);
        setCurrentTodo({ ...todo });
    }

    return (
        <div className="todoApp">


            <div className="breadcum">
                <Breadcrumbs aria-label="breadcrumb">
                    <NavLink
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        to="/"
                    >

                        <Chip icon={<HomeIcon />} label="Home" />



                    </NavLink>

                    <NavLink
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        to="/task-tracker"
                    >

                        <Chip icon={<FormatListBulletedIcon />} label="Task Tracker" />


                    </NavLink>
                </Breadcrumbs>
            </div>
            {isEditing ? (
                <EditForm
                    currentTodo={currentTodo}
                    setIsEditing={setIsEditing}
                    onEditInputChange={handleEditInputChange}
                    onEditFormSubmit={handleEditFormSubmit}
                />
            ) : (
                <AddTodoForm
                    todo={todo}
                    onAddInputChange={handleAddInputChange}
                    onAddFormSubmit={handleAddFormSubmit}
                />
            )}

            <div className="todo-list-wrapper">
                <ul className="todo-list">
                    {todos.map((todo) => (
                        <TodoItem
                            todo={todo}
                            onEditClick={handleEditClick}
                            onDeleteClick={handleDeleteClick}
                        />
                    ))}
                    {todos.length === 0 && (

                        <Typography align="center" variant="h6" gutterBottom>
                            No Todo Found
                        </Typography>

                    )}
                </ul>
            </div>
        </div >
    );
}
