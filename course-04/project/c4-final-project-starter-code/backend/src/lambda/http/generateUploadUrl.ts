import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS  from 'aws-sdk'
import { DynamoDBDataAcccessLayer } from '../../dataAccess/DynamoDBAccess'
import {ApiResponseHelper} from '../../helpers/apiResponseHelper'

const s3 = new AWS.S3({
    signatureVersion: 'v4'
  })
  
const bucketName = process.env.TODO_ATTACHMENT_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION

const dataAccessLayer = new DynamoDBDataAcccessLayer()
const apiResponseHelper = new ApiResponseHelper();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  const uploadUrl = s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: todoId,
    Expires: urlExpiration
  })

  const imageUrl = `https://${bucketName}.s3.amazonaws.com/${todoId}`

  try{

    await dataAccessLayer.updateTodoItemWithAttachmentUrl(todoId,imageUrl);
    return apiResponseHelper.generateDataSuccessResponse(200,"uploadUrl",uploadUrl)
  }catch(Error){
    return apiResponseHelper.generateErrorResponse(404,"Error in updating attachment url")
  }


}
