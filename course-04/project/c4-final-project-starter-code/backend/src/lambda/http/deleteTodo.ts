import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

import * as AWS  from 'aws-sdk'

const s3 = new AWS.S3({
  signatureVersion: 'v4'
})

const bucketName = process.env.TODO_ATTACHMENT_S3_BUCKET
const docClient = new AWS.DynamoDB.DocumentClient()
const todoTable = process.env.TODO_TABLE


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId

    console.log("Todo item to be deleted: ", todoId)

    const params = {
        TableName: todoTable,
        Key:{
            "todoId":todoId
        }
    };

    await docClient.delete(params).promise();

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
