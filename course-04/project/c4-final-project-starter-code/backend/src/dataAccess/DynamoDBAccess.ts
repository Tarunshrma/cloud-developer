import * as AWS  from 'aws-sdk'
import { TodoItem } from '../models/TodoItem'
import { createLogger } from '../utils/logger'
import {CreateTodoRequest} from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import * as uuid from 'uuid'

export class DynamoDBDataAcccessLayer{
    
    constructor(

        private readonly docClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private readonly todoTable = process.env.TODO_TABLE,
        private readonly todoIndex = process.env.INDEX_NAME, 
        private readonly logger = createLogger('DynamoDBDataAcccessLayer')
    )
    {} 

    //Fetch all todo items from user id
    async getTodoItemsFromUserId(userId: string): Promise<TodoItem[]>{

        this.logger.info("Fetch todo items for user:",userId);

        const params = {
            TableName: this.todoTable,
            IndexName: this.todoIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
              ':userId': userId
            }
        };
        
        const result = await this.docClient.query(params,(error, data)=>{
            if(error){
                this.logger.error(error.message)
            }else{
                this.logger.info("Retrived todo items",data)
            }
        }).promise()
    
        return result.Items as TodoItem[]
    }

    //Create a new todo item
    async createTodoItems(newTodo: CreateTodoRequest, userId: string): Promise<TodoItem>{

        this.logger.info(`create todo item for ${userId} with todo item ${newTodo}`);

        const todoId = uuid.v4()
        const currentTimeStamp = new Date().toISOString()

        const todoItem  = new TodoItem()
        todoItem.userId = userId
        todoItem.done = false
        todoItem.todoId = todoId
        todoItem.createdAt = currentTimeStamp 
        todoItem.name = newTodo.name
        todoItem.dueDate = newTodo.dueDate
  
        await this.docClient.put({
            TableName: this.todoTable,
            Item: todoItem
        },(error,data)=>{
            if(error){
                this.logger.error(error.message)
            }else{
                this.logger.info("Succesfull Added Todo Item",data)
            }
        }).promise()

        return todoItem
    }

    //Fetch all todo items from user id
    async deleteTodoItem(todoId: string): Promise<void>{
        this.logger.info("Deleting todo item:",todoId);

        const params = {
            TableName: this.todoTable,
            Key:{
                "todoId":todoId
            }
        };
    
        await this.docClient.delete(params,(error,_data)=>{
            if(error){
                this.logger.error(error.message)
            }else{
                this.logger.info("Succesfull deleted Todo Item: ",todoId)
            }
        }).promise();

    }

    //Update todo item 
    async updateTodoItem(updatedTodo:UpdateTodoRequest, todoId: string): Promise<void>{
        this.logger.info("Updating todo item:",todoId);

        var params = {
            TableName:this.todoTable,
            Key:{
                "todoId": todoId,
            },
            UpdateExpression: "set #namefield = :n, dueDate = :d, done = :done",
            ExpressionAttributeValues:{
                ":n":updatedTodo.name,
                ":d":updatedTodo.dueDate,
                ":done":updatedTodo.done
            },
            ExpressionAttributeNames:{
                "#namefield": "name"
            }
        }
        
        await this.docClient.update(params,(error,_data)=>{
            if(error){
                this.logger.error(error.message)
                throw Error
            }else{
                this.logger.info("Succesfull updated Todo Item: ",todoId)
            }
        }).promise();

    }

    //Update todo item 
    async updateTodoItemWithAttachmentUrl(todoId: string, imageUrl: string): Promise<void>{
        
        this.logger.info("Updating todo item:",todoId);

        var params = {
            TableName:this.todoTable,
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
      
        await this.docClient.update(params,(error,_data)=>{
            if(error){
                this.logger.error(error.message)
                throw Error
            }else{
                this.logger.info("Succesfully updated Todo Item: ",todoId)
            }
        }).promise();

    }

}