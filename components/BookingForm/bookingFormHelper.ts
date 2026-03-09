import { v4 as uuid } from "uuid";

export interface Booking {
  room: string;
  firstDayRaw: string;
  lastDayRaw: string;
  contactInfo: {
    firstName: string;
    lastName: string;
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    email: string;
    phoneNumber: string;
  };
  catInfo: {
    catAmount: number;
    medication: string;
    vaccination: boolean;
  };
}

export const rooms = [
  { id: uuid(), value: "commonRoom", label: "Gemeinschaftsraum" },
  { id: uuid(), value: "singleRoom", label: "Einzelzimmer" },
  { id: uuid(), value: "doubleRoom", label: "Doppelzimmer" },
  { id: uuid(), value: "suite", label: "Suite" },
  { id: uuid(), value: "lakeView", label: "Seeblick" },
  { id: uuid(), value: "mountainView", label: "Bergpanorama" },
];

export const catAmount = [
  { id: uuid(), value: "1", label: 1 },
  { id: uuid(), value: "2", label: 2 },
  { id: uuid(), value: "3", label: 3 },
  { id: uuid(), value: "4", label: 4 },
];

export const vaccList = ["Wurmkur", "Katzenschnupfen", "Katzenseuche"];

export const currentDate = new Date().toISOString().substring(0, 10);

const calcYear = new Date();
calcYear.setDate(calcYear.getDate() + 365);

export const oneYearFromNow = calcYear.toISOString().substring(0, 10);
const calcDay = new Date();
calcDay.setDate(calcDay.getDate() + 1);

let theDayAfterStart = calcDay.toISOString().substring(0, 10);
let calcTwoWeeks = calcYear.toISOString().substring(0, 10);

export const calcTwoWeeksFunc = (startDate: string) => {
  if (startDate) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + 14);
    calcTwoWeeks = date.toISOString().substring(0, 10);
    if (calcTwoWeeks >= oneYearFromNow) {
      calcTwoWeeks = oneYearFromNow;
    }
    return calcTwoWeeks;
  }
  return oneYearFromNow;
};

export const theDayAfterStartFunc = (startDate: string) => {
  if (!startDate) return currentDate;
  const calcNextDay = new Date(startDate);
  if (isNaN(calcNextDay.getTime())) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().substring(0, 10);
  }
  calcNextDay.setDate(calcNextDay.getDate() + 1);
  theDayAfterStart = calcNextDay.toISOString().substring(0, 10);
  return theDayAfterStart;
};

export const transformFormDataToPlainObject = (formData: FormData): Booking => {
  const room = formData.get("room")?.toString() || "";
  const firstDayRaw = formData.get("startDate")?.toString() || "";
  const lastDayRaw = formData.get("endDate")?.toString() || "";
  const firstName = formData.get("firstName")?.toString() || "";
  const lastName = formData.get("lastName")?.toString() || "";
  const street = formData.get("street")?.toString() || "";
  const houseNumber = formData.get("houseNumber")?.toString() || "";
  const postalCode = formData.get("postalCode")?.toString() || "";
  const city = formData.get("city")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const phoneNumber = formData.get("phoneNumber")?.toString() || "";
  const catAmount = formData.get("catAmount")?.toString() || "";
  const medication = formData.get("medication")?.toString() || "";
  const vaccination = formData.get("vaccination") === "on";

  const parsedCatAmount = parseInt(catAmount);

  const booking = {
    room,
    firstDayRaw,
    lastDayRaw,
    contactInfo: {
      firstName,
      lastName,
      street,
      houseNumber,
      postalCode,
      city,
      email,
      phoneNumber,
    },
    catInfo: {
      catAmount: parsedCatAmount,
      medication,
      vaccination,
    },
  };

  return booking;
};
