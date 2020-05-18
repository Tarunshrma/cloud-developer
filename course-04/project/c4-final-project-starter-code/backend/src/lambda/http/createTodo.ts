import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import * as uuid from 'uuid'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS  from 'aws-sdk'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { TodoItem } from '../../models/TodoItem'

const logger = createLogger('createTodo')
const docClient = new AWS.DynamoDB.DocumentClient()
const todoTable = process.env.TODO_TABLE


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', event)

  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  const todoId = uuid.v4()
  const currentTimeStamp = new Date().toISOString()

  console.log("Todo Id",currentTimeStamp)
  console.log("Time Stamp",currentTimeStamp)

  console.log("Request Object",newTodo)

  const todoItem  = new TodoItem();

  todoItem.userId = '5'
  todoItem.done = false
  todoItem.todoId = todoId
  todoItem.createdAt = currentTimeStamp 
  todoItem.name = newTodo.name
  todoItem.dueDate = newTodo.dueDate
  
    await docClient.put({
      TableName: todoTable,
      Item: todoItem
    }).promise()

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
          newPost: todoItem
      })
    }
}
