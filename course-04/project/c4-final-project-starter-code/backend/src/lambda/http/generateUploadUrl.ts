import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import {ApiResponseHelper} from '../../helpers/apiResponseHelper'
import { S3Helper } from '../../helpers/s3Helper'

const apiResponseHelper = new ApiResponseHelper();
const s3Helper = new S3Helper()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  try{
    const uploadUrl = await s3Helper.getUploadUrl(todoId)
    return apiResponseHelper.generateDataSuccessResponse(200,"uploadUrl",uploadUrl)
  }catch(Error){
    return apiResponseHelper.generateErrorResponse(404,"Error in updating attachment url")
  }

}
