import dbConnect from "@/app/lib/mongodb";
import RegularGuest, { Guest } from "../models/regular-guest";

export default async function getRegularGuests() {
  await dbConnect();
  const result = await RegularGuest.find<Guest>({});
  const guests = result.map((doc) => {
    const guest = JSON.parse(JSON.stringify(doc)) as Guest;
    return guest;
  });

  return guests;
}
