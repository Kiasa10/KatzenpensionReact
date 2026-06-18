interface Room {
  title: string;
  cost: string;
  imageUrlReact: string;
  descriptionShort: string;
  descriptionLong: string;
  catsPossible: number;
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export async function getRooms() {
  try {
    const response = await fetch(`${baseUrl}/Room`, {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error("Error loading rooms");
    }

    const rooms: Room[] = await response.json();
    return rooms;
  } catch (error) {
    console.error("Network error or server down: ", error);
    throw error;
  }
}
