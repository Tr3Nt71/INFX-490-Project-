import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

export async function handler() {

  const putParams : any = {
    TableName: process.env.tableName,
  };
  const result = await dynamoDb.scan(putParams).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items),
  };
}