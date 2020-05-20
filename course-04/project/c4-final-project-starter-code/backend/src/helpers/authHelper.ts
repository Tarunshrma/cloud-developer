import {parseUserId} from '../auth/utils'

export class AuthHelper{
    
    getUserIdFromAathrizationHeader(authorizationHeader: string):string{

        const token = this.getToken(authorizationHeader)
        const userId = parseUserId(token);

        return userId

    }

    getToken(authHeader: string): string {
        if (!authHeader) throw new Error('No authentication header')
      
        if (!authHeader.toLowerCase().startsWith('bearer '))
          throw new Error('Invalid authentication header')
      
        const split = authHeader.split(' ')
        const token = split[1]
      
        return token
      }

}