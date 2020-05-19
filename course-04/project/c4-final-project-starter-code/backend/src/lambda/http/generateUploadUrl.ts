import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS  from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()
const todoTable = process.env.TODO_TABLE

const s3 = new AWS.S3({
    signatureVersion: 'v4'
  })
  
const bucketName = process.env.TODO_ATTACHMENT_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  const uploadUrl = s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: todoId,
    Expires: urlExpiration
  })


  console.log("Todo id is ", todoId)
  await updateTodoItem(todoId);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
        uploadUrl: uploadUrl
    })
  }

}

async function updateTodoItem(todoId: string){
  
  const imageUrl = `https://${bucketName}.s3.amazonaws.com/${todoId}`

  console.log("Uplooad url is ", imageUrl)

  var params = {
    TableName:todoTable,
    Key:{
        "todoId": todoId,
    },
    UpdateExpression: "set #attachment = :n",
    ExpressionAttributeValues:{
        ":n":imageUrl,
    },
    ExpressionAttributeNames:{
        "#attachment": "attachmentUrl"
    }
}

await docClient.update(params).promise();
}
