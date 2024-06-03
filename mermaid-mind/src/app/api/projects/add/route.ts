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

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    await client.connect();

    const database = client.db(mongodb_database);
    const collection = database.collection(mongodb_collection);

    await collection.insertOne(requestData);

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
