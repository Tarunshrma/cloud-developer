import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS  from 'aws-sdk'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
//import { TodoItem } from '../../models/TodoItem'

const docClient = new AWS.DynamoDB.DocumentClient()
const todoTable = process.env.TODO_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  var params = {
    TableName:todoTable,
    Key:{
        "todoId": todoId,
    },
    UpdateExpression: "set #namefield = :n, dueDate = :d, done = :done",
    ExpressionAttributeValues:{
        ":n":updatedTodo.name,
        ":d":updatedTodo.dueDate,
        ":done":updatedTodo.done
    },
    ExpressionAttributeNames:{
        "#namefield": "name"
    }
}

await docClient.update(params).promise();

return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: "Updated Succesfully"
  } 
}


