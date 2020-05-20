import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDBDataAcccessLayer } from '../../dataAccess/DynamoDBAccess'
import { ApiResponseHelper } from '../../helpers/apiResponseHelper'
import { S3Helper } from '../../helpers/s3Helper'

const dataAccessLayer = new DynamoDBDataAcccessLayer()
const s3Helper = new S3Helper()

const apiResponseHelper = new ApiResponseHelper();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId

    await dataAccessLayer.deleteTodoItem(todoId)
    s3Helper.deleteAttachmentImage(todoId);

    return apiResponseHelper.generateEmptySuccessResponse(200)

}
