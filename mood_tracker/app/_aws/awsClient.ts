'use server'

import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { env } from "../../env.mjs"

export async function clientAccess(){
    const client = new DynamoDB({
        region: env.AWS_REGION,
        credentials: {
            accessKeyId: env.AWS_ACCESS_KEY_ID,
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY
        }
    });
    return client;
}