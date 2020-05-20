import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { DynamoDBDataAcccessLayer } from '../../dataAccess/DynamoDBAccess'
import {ApiResponseHelper} from '../../helpers/apiResponseHelper'


const dataAccessLayer = new DynamoDBDataAcccessLayer()
const apiResponseHelper = new ApiResponseHelper();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  try{

    await dataAccessLayer.updateTodoItem(updatedTodo,todoId);
    return apiResponseHelper.generateEmptySuccessResponse(204);

  }catch(Error){
    return apiResponseHelper.generateErrorResponse(404,"Error in updating")
  }
 
}


