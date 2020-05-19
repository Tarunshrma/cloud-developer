import 'source-map-support/register'
import { createLogger } from '../../utils/logger'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import {parseUserId} from '../../auth/utils'
import { DynamoDBDataAcccessLayer } from '../../dataAccess/DynamoDBAccess'

const logger = createLogger('createTodo')
const dataAccessLayer = new DynamoDBDataAcccessLayer()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', event)

  const newTodo: CreateTodoRequest = JSON.parse(event.body)

    const authHeader = event.headers['Authorization']
    const token = getToken(authHeader)
    const userId = parseUserId(token);

    logger.info(`create group for user ${userId} with data ${newTodo}`)

    const todoItem = await dataAccessLayer.createTodoItems(newTodo,userId)

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

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
