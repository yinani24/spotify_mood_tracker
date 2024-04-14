"use server";

import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { clientAccess } from "../awsClient";
import sha256 from "@/components/sha256";

export async function createUser(User: User) {
    const { docClient, table } = await clientAccess();
    
    const command = new PutCommand({
        TableName: table,
        Item: {
            id: User.id,
            display_name: User.display_name,
            email: User.email,
            createdAt: User.createdAt,
            updatedAt: User.updatedAt,
            spotifyId: User.spotifyId,
            spotifyURL: User.spotifyURL,
        },
    });

    try {
        const response = await docClient.send(command);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getUser(id: string) {
    const { docClient, table } = await clientAccess();

    const command = new GetCommand({
        TableName: table,
        Key: {
            id: sha256(id),
        },
    });

    try {
        const response = await docClient.send(command);
        console.log(response);
        const item = response.Item;
        if (item === undefined) {
            return null;
        } else {
            return response.Item;
        }
    } catch (error) {
        throw error;
    }
}

export async function updateUser() {}

export async function deleteUser() {}

interface User {
    id: string;
    display_name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    spotifyId: string;
    spotifyURL: string;
}
