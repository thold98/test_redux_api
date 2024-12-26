import React, { useState } from "react";
import {
    Box,
    Button,
    IconButton,
    TextField,
    Typography,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Todo {
    id: number;
    text: string;
    isEditing?: boolean;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState<string>("");

    const handleAddTodo = () => {
        if (inputValue.trim()) {
            setTodos((prevTodos) => [
                ...prevTodos,
                { id: Date.now(), text: inputValue.trim(), isEditing: false },
            ]);
            setInputValue("");
        }
    };

    const handleDeleteTodo = (id: number) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const handleEditTodo = (id: number) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
            )
        );
    };

    const handleSaveTodo = (id: number, newText: string) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
            )
        );
    };

    return (
        <Box sx={{ p: 4, maxWidth: "500px", margin: "0 auto" }}>
            <Typography variant="h4" gutterBottom>
                Todo List
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                    fullWidth
                    label="New Todo"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddTodo}
                >
                    Add
                </Button>
            </Box>
            <List>
                {todos.map((todo) => (
                    <ListItem key={todo.id} sx={{ display: "flex", alignItems: "center" }}>
                        {todo.isEditing ? (
                            <TextField
                                fullWidth
                                defaultValue={todo.text}
                                onBlur={(e) => handleSaveTodo(todo.id, e.target.value)}
                                autoFocus
                            />
                        ) : (
                            <ListItemText primary={todo.text} />
                        )}
                        <IconButton
                            color="warning"
                            onClick={() => handleEditTodo(todo.id)}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            color="error"
                            onClick={() => handleDeleteTodo(todo.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TodoList;
