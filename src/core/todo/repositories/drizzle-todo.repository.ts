import { eq } from 'drizzle-orm'
import { DrizzleDatabase } from "@/db/drizzle";
import { Todo, TodoPresenter } from "../schemas/todo.contract";
import { TodoRepository } from "./todo.contract.repository";
import { todoTable } from "../schemas/drizzle-todo-table.shema";

export class DrizzleTodoRepository implements TodoRepository {
    constructor(private db: DrizzleDatabase) { }

    async findAll(): Promise<Todo[]> {
        const todos = await this.db.query.todos.findMany({
            orderBy: (todo, { desc }) => [
                desc(todo.createdAt), desc(todo.description)
            ]
        });
        return todos;
    }

    async create(todo: any): Promise<TodoPresenter> {
        const existingTodo = await this.db.query.todos.findFirst({
            where: (todoTable, { eq, or }) => or(
                eq(todoTable.id, todo.id),
                eq(todoTable.description, todo.description)
            )
        });

        if (!!existingTodo) {
            return {
                success: false,
                errors: ['Todo already exists']
            }
        }

        await this.db.insert(todoTable).values(todo);

        return {
            success: true,
            todo
        }
    }

    async remove(id: string): Promise < TodoPresenter > {
        const existingTodo = await this.db.query.todos.findFirst({
            where: (todoTable, { eq }) => eq(todoTable.id, id)
        });

        if (!existingTodo) {
            return {
                success: false,
                errors: ['Todo do not exists']
            }
        }

        await this.db.delete(todoTable).where(eq(todoTable.id, id));

        return {
            success: true,
            todo: existingTodo
        }
    }
}