import { NextResponse, NextRequest } from "next/server";
import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "@/env";
import { getServerAuthSession } from "@/server/auth";

const uri = env.MONGODB_URI;
const mongodb_database = env.MONGODB_DATABASE;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function POST(request: NextRequest) {
  const session = await getServerAuthSession();

  try {
    const requestData = await request.json();

    await client.connect();

    const database = client.db(mongodb_database);
    const collection = database.collection("queries");

    const data = {
      ...requestData,
      user: session ? session.user.name : "Anonymous",
      picture: session ? session.user.image : null,
    };

    await collection.insertOne(data);

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

export async function GET() {
  try {
    await client.connect();

    const database = client.db(mongodb_database);
    const collection = database.collection("queries");

    const diagrams = await collection.find().limit(50).toArray();

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
