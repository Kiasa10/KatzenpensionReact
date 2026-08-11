import { NextResponse } from "next/server";
import { list, del } from "@vercel/blob";

export const dynamic = "force-dynamic";
export async function POST() {
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
