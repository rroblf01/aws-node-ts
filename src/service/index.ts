import dynamoDBClient from "../model"
import TodoService from "./service"

const todoService = new TodoService(dynamoDBClient())
export default todoService