type Todo = {
    todoId?: string,
    title: string,
    description: string
};

type TodosList = {
    todoListId?: string,
    TodoListName: string,
    userId: string
};

type User = {
    userId?: string,
    userName: string,
};
export type {
    Todo,
    TodosList,
    User
}