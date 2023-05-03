import { Stack, Skeleton } from '@mui/material';
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { SwitchTransition, CSSTransition, TransitionGroup } from 'react-transition-group';

import { TodosDTO } from '../models/Todos';
import { getDataFromLocalStorage, getTodosFromAPI, savedDataInLocalStorage } from '../services/getTodosFromAPI';
import { TodoMemo } from './Todo.components';
import { CountOfTodos } from './CountOfTodos';
import { showTodosState } from '../constants/showTodosState';
import { AddTodoAndFilterMemo } from './AddTodoAndFilter';

let arr = Array.from(Array(3).keys());

const Todos = () => {
    const [todos, setTodos] = useState<TodosDTO[]>([]);
    const [showTodos, setShowTodos] = useState<showTodosState>(showTodosState.ALL);
    let nodeRef = useRef(todos ? null : todos);

    const handleDeleteTodo = useCallback(
        (id: string) => {
            setTodos(todos ? todos.filter(todo => todo.id !== id) : todos);
        },
        [todos]
    );
    const changeTitleTodo = useCallback((id: string, newString: string) => {
        if (newString.trim() === '') return;
        setTodos(todos => {
            if (!todos) return todos;
            let newItem: TodosDTO;
            return todos.reduce((ac: TodosDTO[], item) => {
                newItem = item.id === id ? { ...item, title: newString } : item;
                return [...ac, newItem];
            }, []);
        });
    }, []);
    const changeCompletedTodo = (id: string, isCompleted: boolean) => {
        setTodos(todos => {
            if (!todos) return todos;
            let newItem: TodosDTO;
            return todos.reduce((ac: TodosDTO[], item) => {
                newItem = item.id === id ? { ...item, completed: isCompleted } : item;
                return [...ac, newItem];
            }, []);
        });
    };
    async function returnTodos() {
        const todosFromAPI = await getTodosFromAPI();
        setTodos(todosFromAPI);
        savedDataInLocalStorage(todosFromAPI);
    }
    useEffect(() => {
        const todosLocal = getDataFromLocalStorage();
        todosLocal && todosLocal.length > 0 ? setTodos(todosLocal) : returnTodos();
    }, []);

    useEffect(() => {
        if (todos) savedDataInLocalStorage(todos);
    }, [todos]);

    let actualTodos: TodosDTO[] = useMemo(() => {
        if (!todos) return [];
        switch (showTodos) {
            case showTodosState.ALL:
                return todos;
            case showTodosState.ACTIVE:
                return todos.filter(todo => todo.completed !== true);
            default:
                return todos.filter(todo => todo.completed !== false);
        }
    }, [showTodos, todos]);

    return (
        <Stack
            sx={{
                width: '100%',
                maxWidth: '560px',
                minWidth: '300px',
            }}
            direction='column'
        >
            <AddTodoAndFilterMemo showTodos={showTodos} setActiveTodos={setShowTodos} setTodos={setTodos} />
            <SwitchTransition mode='out-in'>
                <CSSTransition
                    nodeRef={nodeRef.current}
                    timeout={300}
                    key={todos ? '1' : '2'}
                    in={todos !== null}
                    classNames='changeScele'
                    unmountOnExit
                >
                    {todos.length > 0 ? (
                        <>
                            <CountOfTodos count={todos.length} />
                            <TransitionGroup className='todo-list'>
                                {actualTodos.map(todo => (
                                    <CSSTransition
                                        nodeRef={nodeRef.current}
                                        key={todo.id}
                                        timeout={300}
                                        classNames='changeScele'
                                    >
                                        <TodoMemo
                                            id={todo.id}
                                            isCompleted={todo.completed}
                                            changeCompletedTodo={changeCompletedTodo}
                                            handleChangeTodo={changeTitleTodo}
                                            handleDeleteTodo={handleDeleteTodo}
                                            title={todo.title}
                                        />
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                        </>
                    ) : (
                        <div>
                            <Skeleton sx={{ bgcolor: '#bd93f9', margin: '0 0 30px 0' }} height={25} width={225} />
                            {arr.map(number => (
                                <article
                                    key={number}
                                    style={{
                                        marginBottom: '50px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '80px',
                                        justifyContent: 'space-around',
                                    }}
                                >
                                    <p
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Skeleton
                                            sx={{ bgcolor: '#bd93f9', margin: '0 10px 0 0' }}
                                            height={25}
                                            width={25}
                                        />
                                        <Skeleton sx={{ bgcolor: '#bd93f9' }} height={20} width={200} />
                                    </p>

                                    <p
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Skeleton
                                            sx={{ bgcolor: '#bd93f9', margin: '0 10px 0 0' }}
                                            height={35}
                                            width={85}
                                        />
                                        <Skeleton sx={{ bgcolor: '#bd93f9' }} height={35} width={100} />
                                    </p>
                                </article>
                            ))}
                        </div>
                    )}
                </CSSTransition>
            </SwitchTransition>
        </Stack>
    );
};

export const TodosMemo = React.memo(Todos);
