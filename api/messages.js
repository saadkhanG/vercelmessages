import { MongoClient } from "mongodb";

let cachedClient = null;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!cachedClient) {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      cachedClient = client;
    }

    const db = cachedClient.db("saadtest");
    const data = await db.collection("n8n_chat_histories").find({}).toArray();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
