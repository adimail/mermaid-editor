import { NextResponse, NextRequest } from "next/server";
import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "@/env";

const uri = env.MONGODB_URI;
const mongodb_database = env.MONGODB_DATABASE;
const mongodb_collection = env.MONGODB_COLLECTION;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

import { URLSearchParams } from "url";

export async function GET(request: NextRequest) {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db(mongodb_database);
    const collection = database.collection(mongodb_collection);

    const params = new URLSearchParams(request.url.split("?")[1]);
    const userID = params.get("userID");

    let query = {};

    if (userID) {
      query = { userID };
    }

    const diagrams = await collection.find(query).toArray();

    return NextResponse.json({ diagrams }, { status: 200 });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);

    return NextResponse.json(
      { message: "Error connecting to MongoDB" },
      { status: 500 },
    );
  } finally {
    await client.close();
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON data from the request body
    const requestData = await request.json();

    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db(mongodb_database);
    const collection = database.collection(mongodb_collection);

    // Insert the provided JSON data into the collection
    await collection.insertOne(requestData);

    // Return a success response
    return NextResponse.json(
      { message: "Data inserted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);

    return NextResponse.json(
      { message: "Error inserting data into MongoDB" },
      { status: 500 },
    );
  } finally {
    await client.close();
  }
}
