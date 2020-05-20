import * as AWS  from 'aws-sdk'

import { DynamoDBDataAcccessLayer } from '../dataAccess/DynamoDBAccess'

const s3 = new AWS.S3({
    signatureVersion: 'v4'
})

const bucketName = process.env.TODO_ATTACHMENT_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION
const dataAccessLayer = new DynamoDBDataAcccessLayer()

export class S3Helper{

    deleteAttachmentImage(todoId: string){
        s3.deleteObject({
          Bucket: bucketName,
          Key: todoId
        })
    }

    async getUploadUrl(todoId: string): Promise<string>{

        const uploadUrl = s3.getSignedUrl('putObject', {
            Bucket: bucketName,
            Key: todoId,
            Expires: urlExpiration
          })

          const imageUrl = `https://${bucketName}.s3.amazonaws.com/${todoId}`

          await dataAccessLayer.updateTodoItemWithAttachmentUrl(todoId,imageUrl);

          return uploadUrl

    }



}