import 'source-map-support/register'
import { createLogger } from '../../utils/logger'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { DynamoDBDataAcccessLayer } from '../../dataAccess/DynamoDBAccess'
import {ApiResponseHelper} from '../../helpers/apiResponseHelper'
import {AuthHelper} from '../../helpers/authHelper'

const logger = createLogger('createTodo')
const dataAccessLayer = new DynamoDBDataAcccessLayer()
const apiResponseHelper = new ApiResponseHelper();
const authHelper = new AuthHelper() 

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', event)

  const newTodo: CreateTodoRequest = JSON.parse(event.body)

    const authHeader = event.headers['Authorization']
    const userId = authHelper.getUserIdFromAathrizationHeader(authHeader)

    logger.info(`create group for user ${userId} with data ${newTodo}`)

    const todoItem = await dataAccessLayer.createTodoItems(newTodo,userId)

    return apiResponseHelper.generateDataSuccessResponse(201,"newPost",todoItem);
}
