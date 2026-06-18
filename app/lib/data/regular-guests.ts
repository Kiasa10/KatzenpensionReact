interface Guest {
  name: string;
  age: number;
  imageUrlReact: string;
  descriptionShort: string;
  descriptionLong: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export default async function getRegularGuests() {
  try {
    const response = await fetch(`${baseUrl}/RegularGuest`, {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error("Error loading guests");
    }

    const guests: Guest[] = await response.json();
    return guests;
  } catch (error) {
    console.error("Network error or server down: ", error);
    throw error;
  }
}
