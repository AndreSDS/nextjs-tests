import { drizzleDatase } from "@/db/drizzle";
import { DrizzleTodoRepository } from "./drizzle-todo.repository";
import { TodoRepository } from "./todo.contract.repository";

export const defaultTodoRepository: TodoRepository = new DrizzleTodoRepository(drizzleDatase.db);