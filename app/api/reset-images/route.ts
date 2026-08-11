//import path from "path";
//import fs from "node:fs/promises";
import { NextResponse } from "next/server";
import { list, del } from "@vercel/blob";

/*WITHOUT VERCEL - enable for local
interface NodeException {
  code?: string;
  message?: string;
}
*/
export const dynamic = "force-dynamic";
export async function POST() {
  /*WITHOUT VERCEL - enable for local
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

*/

//disable for local
  try {
    const { blobs } = await list({ token: process.env.BLOB_READ_WRITE_TOKEN });
    if (!blobs || blobs.length === 0) {
      return NextResponse.json({ message: "Keine Bilder zum Löschen vorhanden." });
    }
    const urlsToDelete = blobs.map((blob) => blob.url);
    await del(urlsToDelete, { token: process.env.BLOB_READ_WRITE_TOKEN });
    return NextResponse.json({
      success: true,
      message: "Bilder erfolgreich aus Vercel Blob gelöscht.",
    });
  } catch (error) {
    return NextResponse.json({ error: "Fehler beim Löschen der Dateien aus dem Blob Storage" }, { status: 500 });
  }
}
