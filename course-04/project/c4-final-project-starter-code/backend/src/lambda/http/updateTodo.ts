import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { DynamoDBDataAcccessLayer } from '../../dataAccess/DynamoDBAccess'


const dataAccessLayer = new DynamoDBDataAcccessLayer()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  try{

    await dataAccessLayer.updateTodoItem(updatedTodo,todoId);

    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: "Updated Succesfully"
    } 

  }catch(Error){

    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: "Error in updating"
    } 
  }

 
}


