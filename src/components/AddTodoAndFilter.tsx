import { Stack } from '@mui/material';
import React, { useState } from 'react';
import { v4 } from 'uuid';

import { Input } from '../UI/Input';
import { Btn } from '../UI/Btn';
import { TodosDTO } from '../models/Todos';
import { showTodosState } from '../constants/showTodosState';
interface Props {
    setTodos: Function;
    setActiveTodos: Function;
    showTodos: showTodosState;
}
const AddTodoAndFilter = ({ setTodos, setActiveTodos, showTodos }: Props) => {
    const [text, setText] = useState('');
    const handleAddTodo = () => {
        if (text.trim() === '') return;
        setText('');
        setTodos((prev: TodosDTO[]) => [{ id: v4(), title: text, completed: false }, ...prev]);
    };
    return (
        <Stack
            sx={{
                width: '100%',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Stack
                sx={{
                    width: '100%',
                    alignItems: 'center',
                    display: 'flex',
                }}
                direction='row'
            >
                <Input
                    placeholderText='New todo...'
                    textField='new Task'
                    width={428}
                    handleChange={setText}
                    text={text}
                />
                <Btn style={{ width: '80px', height: '32px' }} text='Add' handleClick={handleAddTodo} />
            </Stack>
            <Stack
                sx={{
                    alignSelf: 'self-start',
                    width: '100%',
                }}
                direction='row'
            >
                <Btn
                    style={{
                        width: '33%',
                        boxShadow: showTodosState.ALL === showTodos ? '0px 0px 5px 5px rgb(255, 255, 255, 30%)' : '',
                    }}
                    text='Show All tasks'
                    handleClick={() => {
                        setActiveTodos(showTodosState.ALL);
                    }}
                />
                <Btn
                    style={{
                        width: '33%',
                        boxShadow: showTodosState.ACTIVE === showTodos ? '0px 0px 5px 5px rgb(255, 255, 255, 30%)' : '',
                    }}
                    text='Show Active tasks'
                    handleClick={() => {
                        setActiveTodos(showTodosState.ACTIVE);
                    }}
                />
                <Btn
                    style={{
                        width: '33%',
                        boxShadow:
                            showTodosState.COMPLETED === showTodos ? '0px 0px 5px 5px rgb(255, 255, 255, 30%)' : '',
                    }}
                    text='Show Completed tasks'
                    handleClick={() => {
                        setActiveTodos(showTodosState.COMPLETED);
                    }}
                />
            </Stack>
        </Stack>
    );
};
export const AddTodoAndFilterMemo = React.memo(AddTodoAndFilter);
