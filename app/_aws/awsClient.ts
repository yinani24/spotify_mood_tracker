"use server";

import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { env } from "../../env.mjs";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export async function clientAccess() {
    const client = new DynamoDB({
        region: env.AWS_REGION,
        credentials: {
            accessKeyId: env.AWS_ACCESS_KEY_ID,
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        },
    });
    const docClient = DynamoDBDocumentClient.from(client);
    const table = env.TABLE_NAME;
    return { docClient, table };
}
