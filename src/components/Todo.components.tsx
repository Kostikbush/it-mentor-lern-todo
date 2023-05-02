import { Checkbox } from '@mui/material';
import React, { useRef, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { STitle, STodoItem, SWrapperTodo } from '../assets/styles/todo.style';
import { Btn } from '../UI/Btn';
import { Input } from '../UI/Input';

interface Props {
    title: string;
    isCompleted: boolean;
    handleDeleteTodo: (id: string) => void;
    handleChangeTodo: (id: string, newText: string) => void;
    changeCompletedTodo: (id: string, isCompleted: boolean) => void;
    id: string;
}
const Todo = ({ title, id, isCompleted, handleDeleteTodo, handleChangeTodo, changeCompletedTodo }: Props) => {
    const [isChangeTodo, setIsChangeTodo] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const nodeRef = useRef(null);
    return (
        <SwitchTransition>
            <CSSTransition
                nodeRef={nodeRef.current}
                timeout={300}
                key={isChangeTodo ? '1' : '2'}
                in={isChangeTodo}
                classNames='changeScele'
                unmountOnExit
            >
                {isChangeTodo ? (
                    <SWrapperTodo>
                        <STodoItem>
                            <Input textField='new text' width={250} handleChange={setNewTitle} text={newTitle} />
                        </STodoItem>
                        <STodoItem>
                            <Btn text='Cancel' handleClick={() => setIsChangeTodo(false)} />
                            <Btn
                                text='Save'
                                handleClick={() => {
                                    setIsChangeTodo(false);
                                    handleChangeTodo(id, newTitle);
                                }}
                            />
                        </STodoItem>
                    </SWrapperTodo>
                ) : (
                    <SWrapperTodo>
                        <STodoItem>
                            <Checkbox
                                sx={{
                                    margin: '0 10px 0 0',
                                    maxWidth: '30px',
                                    color: '#bd93f9',
                                    '&.Mui-checked': {
                                        color: '#bd93f9',
                                    },
                                }}
                                checked={isCompleted}
                                onChange={() => changeCompletedTodo(id, !isCompleted)}
                            />
                            <STitle isCompleted={isCompleted}>{title}</STitle>
                        </STodoItem>
                        <STodoItem>
                            <Btn text='Edit' handleClick={() => setIsChangeTodo(true)} />
                            <Btn text='Delete' handleClick={() => handleDeleteTodo(id)} />
                        </STodoItem>
                    </SWrapperTodo>
                )}
            </CSSTransition>
        </SwitchTransition>
    );
};
export const TodoMemo = React.memo(Todo);
