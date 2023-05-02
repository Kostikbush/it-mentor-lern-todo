import { SCount } from '../assets/styles/todo.style';

export const CountOfTodos = ({ count }: { count: number }) => {
    return <SCount>{count} tasks remaining</SCount>;
};
