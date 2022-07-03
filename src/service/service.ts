import { DocumentClient } from "aws-sdk/clients/dynamodb"
import Todo from "../model/Todo"

export default class TodoService {

    private Tablename: string = "TodosTable"

    constructor(private docClient: DocumentClient) { }

    async getAllTodos(): Promise<Todo[]> {
        const todos = await this.docClient.scan({
            TableName: this.Tablename,
        }).promise()

        return todos.Items as Todo[]
    }

    async createTodo(todo: Todo): Promise<Todo> {
        await this.docClient.put({
            TableName: this.Tablename,
            Item: todo
        }).promise()

        return todo as Todo
    }

    async getTodo(id: string): Promise<any> {

        const todo = await this.docClient.get({
            TableName: this.Tablename,
            Key: {
                todosId: id
            }
        }).promise()

        if (!todo.Item) {
            throw new Error("Id does not exit")
        }

        return todo.Item as Todo
    }

    async updateTodo(id: string): Promise<Todo> {
        const update = await this.docClient.update({
            TableName: this.Tablename,
            Key: { todosId: id },
            UpdateExpression: "set #status = :status",
            ExpressionAttributeNames: {
                "#status": "status"
            },
            ExpressionAttributeValues: {
                ":status": true,
            },
            ReturnValues: "ALL_NEW",
        }).promise()

        return update.Attributes as Todo
    }

    async deleteTodo(id: string): Promise<any> {
        return await this.docClient.delete({
            TableName: this.Tablename,
            Key: {
                todosId: id
            }
        }).promise()
    }
}