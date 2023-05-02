import styled from 'styled-components';
interface TextProps {
    isCompleted: boolean;
}
export const SWrapperTodo = styled.article`
    display: flex;
    align-items: start;
    flex-direction: column;
    justify-content: space-around;
    min-width: 320px;
    margin-bottom: 50px;
    max-width: 560px;
    transition: all 0.4s;
    &:last-child {
        margin-bottom: 0;
    }
`;
export const STodoItem = styled.div`
    display: flex;
    align-items: center;
`;
export const STitle = styled.span<TextProps>`
    text-decoration: ${({ isCompleted }) => {
        return `${isCompleted ? 'line-through' : 'none'}`;
    }};
    max-width: 500px;
    min-width: 300px;
    min-width: 320px;
    color: #fff;
    word-break: break-all;
`;
export const SCount = styled.h2`
    color: #fff;
    font-size: 1.5em;
    font-weight: bold;
    max-width: 400px;
`;
