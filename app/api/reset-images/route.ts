import path from "path";
import fs from "node:fs/promises";
import { NextResponse } from "next/server";

interface NodeException {
  code?: string;
  message?: string;
}

export async function POST() {
  const directory = path.join(process.cwd(), "public", "userImages");

  try {
    const files = await fs.readdir(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      await fs.unlink(filePath);
    }
    console.log(`Images from ${directory} deleted`);
    return NextResponse.json({ message: "Images successfully deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting files: ", error);

    const err = error as NodeException;
    return NextResponse.json({ message: err.code === "ENOENT" ? "Directory not found" : "Error deleting files" }, { status: 500 });
  }
}
