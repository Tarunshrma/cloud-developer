import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import {parseUserId} from '../../auth/utils'
import { DynamoDBDataAcccessLayer } from '../../dataAccess/DynamoDBAccess'

const dataAccessLayer = new DynamoDBDataAcccessLayer()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event: ', event)
    const authHeader = event.headers['Authorization']
    const token = getToken(authHeader)
    const userId = parseUserId(token);

    const items = await dataAccessLayer.getTodoItemsFromUserId(userId)

    return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(
          items
        )
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