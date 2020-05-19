import {  APIGatewayProxyResult } from 'aws-lambda'

export class ApiResponseHelper{

    generateDataSuccessResponse(statusCode: number, items: any): APIGatewayProxyResult{
        return {
            statusCode: statusCode,
            headers:{
              'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify({
              items
            })
          }
    }
    
    generateEmptySuccessResponse(statusCode: number): APIGatewayProxyResult{
        return {
            statusCode: statusCode,
            headers:{
              'Access-Control-Allow-Origin':'*'
            },
            body: null
          }
    }

    generateErrorResponse(statusCode: number,message:string): APIGatewayProxyResult{
        return {
            statusCode: statusCode,
            headers:{
              'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify({
              message
            })
          }
    }
}