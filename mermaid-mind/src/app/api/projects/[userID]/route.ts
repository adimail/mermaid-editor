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

export async function GET(
  req: NextRequest,
  { params }: { params: { userID: string } },
) {
  const { userID } = params;

  try {
    await client.connect();

    const database = client.db(mongodb_database);
    const collection = database.collection(mongodb_collection);

    const diagrams = await collection
      .find({ userID: userID })
      .limit(50)
      .toArray();

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
