import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDBDataAcccessLayer } from '../../dataAccess/DynamoDBAccess'
import {ApiResponseHelper} from '../../helpers/apiResponseHelper'
import {AuthHelper} from '../../helpers/authHelper'

const dataAccessLayer = new DynamoDBDataAcccessLayer()
const apiResponseHelper = new ApiResponseHelper();
const authHelper = new AuthHelper() 

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event: ', event)
    const authHeader = event.headers['Authorization']
    const userId = authHelper.getUserIdFromAathrizationHeader(authHeader)

    const items = await dataAccessLayer.getTodoItemsFromUserId(userId)
    return apiResponseHelper.generateDataSuccessResponse(200,"items",items)
}
