import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();



export async function handler(event: {body: string }) {

  const coords = (event.body).split(",")
  //const coords = (JSON.stringify(event.body)).split('-')
  //const coords = (JSON.stringify(JSON.parse(event.body))).split('-')
  const myLatitude = coords[0];
  const myLongitude = coords[1]




  const getParams : any = {
    // Get the table name from the environment variable
    TableName: process.env.tableName,
    // Get the row where the counter is called "clicks"
    Key: {
      latitude: myLatitude,
      longitude: myLongitude,
    },
  };
  const results = await dynamoDb.get(getParams).promise();

  // If there is a row, then get the value of the
  // column called "tally"
  // let count = results.Item ? results.Item.tally : 0;

  const putParams : any = {
    TableName: process.env.tableName,
    
    Key: {
      latitude: myLatitude,
      longitude: myLongitude,
    },

  };
  await dynamoDb.update(putParams).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(putParams.Key),
  };
}