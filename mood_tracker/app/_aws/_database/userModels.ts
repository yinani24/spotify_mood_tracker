'use server'

import { clientAccess } from "../awsClient";

export async function createUser(User: User){
    const client = await clientAccess();
}

export async function getUser(){

}

export async function updateUser(){

}

export async function deleteUser(){

}

interface User{
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    spotifyId: string;
}