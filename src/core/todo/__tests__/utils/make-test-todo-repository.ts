import { drizzleDatase } from "@/db/drizzle";
import { DrizzleTodoRepository } from "../../repositories/drizzle-todo.repository";
import { Todo } from "../../schemas/todo.contract";
import { eq } from "drizzle-orm";

const newTodos: Todo[] = [{
    id: '1',
    description: 'test repository 1',
    createdAt: new Date().toISOString()
},
{
    id: '2',
    description: 'test repository 2',
    createdAt: new Date().toISOString()
}]

export async function makeTestTodoRepository() {
    const { db, todoTable } = drizzleDatase;
    const todoTestRepository = new DrizzleTodoRepository(db);
    
    const getAllTodos = () => db.query.todos.findMany()
    const getTodoById = (id: string) => db.query.todos.findFirst({ where: eq(todoTable.id, id) })
    const insertTodo = (todo: Todo) => db.insert(todoTable).values(todo).returning().get(   )
    const deleteTodo = (id: string) => db.delete(todoTable).where(eq(todoTable.id, id))
    const deleteTodos = () => db.delete(todoTable);

    return {
        todoTestRepository,
        getAllTodos,
        getTodoById,
        insertTodo,
        deleteTodo,
        deleteTodos,
        newTodos
    }
}