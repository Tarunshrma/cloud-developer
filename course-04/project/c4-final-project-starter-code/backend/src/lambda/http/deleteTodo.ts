import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

import * as AWS  from 'aws-sdk'
import { DynamoDBDataAcccessLayer } from '../../dataAccess/DynamoDBAccess'

const s3 = new AWS.S3({
  signatureVersion: 'v4'
})

const bucketName = process.env.TODO_ATTACHMENT_S3_BUCKET
const dataAccessLayer = new DynamoDBDataAcccessLayer()


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId

    await dataAccessLayer.deleteTodoItem(todoId)
    deleteAttachmentImage(todoId);

    return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: null
      }
}

function deleteAttachmentImage(todoId: string){
  s3.deleteObject({
    Bucket: bucketName,
    Key: todoId
  })
  
}
