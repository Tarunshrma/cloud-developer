import 'source-map-support/register'

import * as AWS  from 'aws-sdk'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDBDataAcccessLayer } from '../../dataAccess/DynamoDBAccess'
import {ApiResponseHelper} from '../../helpers/apiResponseHelper'

const s3 = new AWS.S3({
  signatureVersion: 'v4'
})

const bucketName = process.env.TODO_ATTACHMENT_S3_BUCKET
const dataAccessLayer = new DynamoDBDataAcccessLayer()

const apiResponseHelper = new ApiResponseHelper();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId

    await dataAccessLayer.deleteTodoItem(todoId)
    deleteAttachmentImage(todoId);

    return apiResponseHelper.generateEmptySuccessResponse(200)

}

function deleteAttachmentImage(todoId: string){
  s3.deleteObject({
    Bucket: bucketName,
    Key: todoId
  })
  
}
