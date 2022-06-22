type Todo = {
    id?: string,
    tittle: string,
    description: string
};

type DeletTodo = (id: string) => void;


export type {
    Todo,
    DeletTodo
}