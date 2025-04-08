import mongoose from "mongoose";

async function connectToDatabase(): Promise<void> {
  const databaseURL: string | undefined = process.env.MONGODB_URI;

  if (!databaseURL) {
    console.error(
      "Database URL is not defined. Please set the MONGODB_URI environment variable."
    );
    process.exit(1);
  }

  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(databaseURL);
    console.log("Database connected");
  } catch (err) {
    console.error(`Database connection error: ${(err as Error).message}`);
    process.exit(1);
  }

  const db = mongoose.connection;

  db.on("error", (err: Error) => {
    console.error(`Connection error: ${(err as Error).message}`);
  });

  db.on("disconnected", () => {
    console.log("Database disconnected");
  });

  db.on("connected", () => {
    console.log("Mongoose default connection is open");
  });

}

export default connectToDatabase;