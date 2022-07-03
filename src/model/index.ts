import * as AWS from "aws-sdk"

import { DocumentClient } from "aws-sdk/clients/dynamodb"

export default (): DocumentClient => {
    try {

        if (process.env.IS_OFFLINE) {
            return new AWS.DynamoDB.DocumentClient({
                region: "localhost",
                endpoint: "http://localhost:5000",
            });
        }

        return new AWS.DynamoDB.DocumentClient()
    } catch (e) {
        console.error(e)
    }
}