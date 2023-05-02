import data from '../dataBase.json';
import { TodosDTO } from '../models/Todos';
export const getTodosFromAPI = () => {
    return new Promise<TodosDTO[]>((res, rej) => {
        setTimeout(() => {
            let resultData = data.todos;
            return res(resultData);
        }, 1000);
    });
};
export const savedDataInLocalStorage = (data: TodosDTO[]) => {
    localStorage.setItem('todos', JSON.stringify(data));
};
export const getDataFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('todos') || 'null');
};
