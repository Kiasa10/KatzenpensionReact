"use client";

import classes from "./bookingForm.module.css";
import ButtonLink from "@/components/ButtonLink/ButtonLink";
import Input from "../FormComponents/Input/Input";
import Fieldset from "../FormComponents/Fieldset/Fieldset";
import TextArea from "../FormComponents/TextArea/TextArea";
import DatePicker from "../FormComponents/DatePicker/DatePicker";
import FormRow from "../FormComponents/FormRow/FormRow";
import Checkbox from "../FormComponents/Checkbox/Checkbox";
import DisplayList from "../DisplayList/DisplayList";
import CareSection from "../CareSection/CareSection";
import FormRowItem from "../FormComponents/FormRowItem/FormRowItem";
import Dropdown from "../FormComponents/Dropdown/Dropdown";
import RequiredText from "../FormComponents/RequiredText/RequiredText";
import FormControls from "../FormComponents/FormControls/FormControls";
import { createNewBooking } from "@/app/lib/data/bookingsActions";
import { useActionState, useState, useEffect, useCallback } from "react";
import { useBookingValidation } from "@/app/lib/useBookingValidation";
import {
  rooms,
  catAmount,
  currentDate,
  oneYearFromNow,
  calcTwoWeeksFunc,
  theDayAfterStartFunc,
  vaccList,
} from "@/components/BookingForm/bookingFormHelper";
import { bookingSchema } from "./ZodSchemaBooking";
import z from "zod";

interface ContactState {
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  email: string;
  phoneNumber: string;
}

interface CatState {
  catAmount: string;
  medication: string;
  vaccination: boolean;
}

interface LocalFormState {
  room: string;
  startDate: string;
  endDate: string;
  contactInfo: ContactState;
  catInfo: CatState;
}

const initialFormState: LocalFormState = {
  room: "",
  startDate: "",
  endDate: "",
  contactInfo: {
    firstName: "",
    lastName: "",
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    email: "",
    phoneNumber: "",
  },
  catInfo: {
    catAmount: "",
    medication: "",
    vaccination: false,
  },
};

export default function BookingForm() {
  const [state, dispatch, isPending] = useActionState(createNewBooking, { errors: {} });

  const [startDate, setStartDate] = useState("");
  const [formKey, setFormKey] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const { validationErrors, setValidationErrors, validate, initValidation } = useBookingValidation();

  const [formValues, setFormValues] = useState<LocalFormState>(initialFormState);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormValues((prev) => {
      if (name in prev.contactInfo) {
        return {
          ...prev,
          contactInfo: { ...prev.contactInfo, [name]: value },
        };
      }

      if (name in prev.catInfo) {
        const checked = e.target instanceof HTMLInputElement ? e.target.checked : false;
        return {
          ...prev,
          catInfo: {
            ...prev.catInfo,
            [name]: name === "vaccination" ? checked : value,
          },
        };
      }

      return { ...prev, [name]: value };
    });

    setValidationErrors((prev) => {
      const hasMinThreeChars = ["firstName", "lastName", "street", "city", "phoneNumber"].includes(name);
      const hasMinOneChar = ["houseNumber", "postalCode"].includes(name);
      const isSelectionField = ["room", "startDate", "endDate", "catAmount"].includes(name);

      if (hasMinThreeChars && value.trim().length >= 3) {
        return { ...prev, [name]: "" };
      }

      if (hasMinOneChar && value.trim().length >= 1) {
        return { ...prev, [name]: "" };
      }

      if (isSelectionField && value.trim() !== "") {
        return { ...prev, [name]: "" };
      }

      if (name === "email") {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(value.trim())) {
          return { ...prev, email: "" };
        }
      }

      return prev;
    });
  };

  const handleReset = useCallback(() => {
    setValidationErrors(initValidation);
    setStartDate("");
    setFormValues(initialFormState);
    setFormKey((prev) => prev + 1);
  }, [initValidation, setValidationErrors]);

  useEffect(() => {
    if (state.success) {
      setShowSuccess(true);
      handleReset();
      const timeout = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [state, handleReset]);

  const backendMsg = state.errors?._form;
  let msgPlace;
  if (showSuccess) {
    msgPlace = <p className={classes.success}>Buchung erfolgreich</p>;
  } else if (backendMsg) {
    msgPlace = <p className={classes.error}>{backendMsg}</p>;
  } else {
    msgPlace = <p className={classes.placeholder}>Placeholder</p>;
  }

  const formAction = () => {
    const dataToValidate = {
      room: formValues.room,
      firstDay: formValues.startDate ? new Date(formValues.startDate) : undefined,
      lastDay: formValues.endDate ? new Date(formValues.endDate) : undefined,
      contactInfo: formValues.contactInfo,
      catInfo: {
        ...formValues.catInfo,
        catAmount: formValues.catInfo.catAmount ? Number(formValues.catInfo.catAmount) : undefined,
      },
    };

    const result = bookingSchema.safeParse(dataToValidate);
    setValidationErrors(initValidation);

    if (!result.success) {
      const treefieldErrors = z.treeifyError(result.error);
      const contactProps = treefieldErrors.properties?.contactInfo?.properties;
      const catInfoProps = treefieldErrors.properties?.catInfo?.properties;

      setValidationErrors({
        room: treefieldErrors.properties?.room?.errors?.[0] || "",
        startDate: treefieldErrors.properties?.firstDay?.errors?.[0] || "",
        endDate: treefieldErrors.properties?.lastDay?.errors?.[0] || "",
        firstName: contactProps?.firstName?.errors?.[0] || "",
        lastName: contactProps?.lastName?.errors?.[0] || "",
        street: contactProps?.street?.errors?.[0] || "",
        houseNumber: contactProps?.houseNumber?.errors?.[0] || "",
        postalCode: contactProps?.postalCode?.errors?.[0] || "",
        city: contactProps?.city?.errors?.[0] || "",
        email: contactProps?.email?.errors?.[0] || "",
        phoneNumber: contactProps?.phoneNumber?.errors?.[0] || "",
        catAmount: catInfoProps?.catAmount?.errors?.[0] || "",
        medication: catInfoProps?.medication?.errors?.[0] || "",
        vaccination: catInfoProps?.vaccination?.errors?.[0] || "",
      });

      return;
    }

    const payload = {
      room: formValues.room,
      firstDayRaw: formValues.startDate,
      lastDayRaw: formValues.endDate,
      contactInfo: formValues.contactInfo,
      catInfo: {
        catAmount: Number(formValues.catInfo.catAmount),
        medication: formValues.catInfo.medication,
        vaccination: formValues.catInfo.vaccination,
      },
    };

    dispatch(payload);
  };

  const calcTwoWeeks = calcTwoWeeksFunc(startDate) || oneYearFromNow;
  const theDayAfterStart = startDate ? theDayAfterStartFunc(startDate) : currentDate;
  return (
    <form action={formAction} className={classes.bookingForm} key={formKey}>
      <div className={classes.formDates}>
        <FormRowItem fixedSize>
          <Dropdown
            isRoom
            label="Raum *"
            name="room"
            value={formValues.room}
            data={rooms}
            error={validationErrors.room}
            required
            onBlur={validate}
            onChange={handleFieldChange}
          />
        </FormRowItem>
        <FormRowItem fixedSize>
          <DatePicker
            name="startDate"
            label="Erster Tag *"
            min={currentDate}
            max={oneYearFromNow}
            value={formValues.startDate}
            required
            onChange={(e) => {
              setStartDate(e.target.value);
              handleFieldChange(e);
            }}
            onBlur={validate}
            error={validationErrors.startDate}
          />
        </FormRowItem>
        <FormRowItem fixedSize>
          <DatePicker
            name="endDate"
            label="Letzter Tag *"
            min={theDayAfterStart}
            max={calcTwoWeeks}
            value={formValues.endDate}
            onChange={handleFieldChange}
            onBlur={validate}
            required
            error={validationErrors.endDate}
          />
        </FormRowItem>
      </div>

      <div className={classes.fieldsetWrapper}>
        <Fieldset legend="Kontaktdaten">
          <FormRow>
            <FormRowItem>
              <Input
                type="text"
                name="firstName"
                label="Vorname *"
                value={formValues.contactInfo.firstName}
                onBlur={validate}
                error={validationErrors.firstName}
                onChange={handleFieldChange}
                required
              />
            </FormRowItem>
            <FormRowItem>
              <Input
                type="text"
                name="lastName"
                label="Nachname *"
                value={formValues.contactInfo.lastName}
                onBlur={validate}
                error={validationErrors.lastName}
                onChange={handleFieldChange}
                required
              />
            </FormRowItem>
          </FormRow>
          <FormRow>
            <FormRowItem>
              <Input
                type="text"
                name="street"
                label="Straße *"
                value={formValues.contactInfo.street}
                onBlur={validate}
                error={validationErrors.street}
                onChange={handleFieldChange}
                required
              />
            </FormRowItem>
            <FormRowItem>
              <Input
                type="text"
                name="houseNumber"
                label="Hausnummer *"
                value={formValues.contactInfo.houseNumber}
                onBlur={validate}
                error={validationErrors.houseNumber}
                onChange={handleFieldChange}
                isShortInput
                required
              />
            </FormRowItem>
          </FormRow>
          <FormRow>
            <FormRowItem>
              <Input
                type="text"
                name="postalCode"
                label="PLZ *"
                value={formValues.contactInfo.postalCode}
                onBlur={validate}
                error={validationErrors.postalCode}
                onChange={handleFieldChange}
                isShortInput
                required
              />
            </FormRowItem>
            <FormRowItem>
              <Input
                type="text"
                name="city"
                label="Stadt *"
                value={formValues.contactInfo.city}
                onBlur={validate}
                error={validationErrors.city}
                onChange={handleFieldChange}
                required
              />
            </FormRowItem>
          </FormRow>
          <FormRow>
            <FormRowItem>
              <Input
                type="email"
                name="email"
                label="E-Mail *"
                value={formValues.contactInfo.email}
                onBlur={validate}
                error={validationErrors.email}
                onChange={handleFieldChange}
                required
              />
            </FormRowItem>
            <FormRowItem>
              <Input
                type="text"
                name="phoneNumber"
                label="Telefonnummer *"
                value={formValues.contactInfo.phoneNumber}
                onBlur={validate}
                error={validationErrors.phoneNumber}
                onChange={handleFieldChange}
                required
              />
            </FormRowItem>
          </FormRow>
        </Fieldset>
      </div>
      <div className={classes.fieldsetWrapper}>
        <Fieldset legend="Information zu Katze/n">
          <FormRowItem>
            <Dropdown
              label="Anzahl Katzen * "
              name="catAmount"
              data={catAmount}
              value={formValues.catInfo.catAmount}
              error={validationErrors.catAmount}
              onBlur={validate}
              onChange={handleFieldChange}
              required
            />
          </FormRowItem>
          <CareSection header="Medikamente" text="Benötigt eine oder mehrere Katzen täglich Medikamente?">
            <div className={classes.careSection}>
              <FormRowItem>
                <TextArea
                  name="medication"
                  label="Bitte hier Name, Dosis und Einnahmezeitraum der Medikamente auflisten."
                  value={formValues.catInfo.medication}
                  error={validationErrors.medication}
                  onChange={handleFieldChange}
                  onBlur={validate}
                ></TextArea>
              </FormRowItem>
            </div>
          </CareSection>
          <Checkbox
            label="Hiermit bestätige ich, dass alle abzugebenden Tiere bei folgender Medikation auf aktuellem Stand (nicht älter als 1 Jahr) sind: *"
            name="vaccination"
            checked={formValues.catInfo.vaccination}
            onChange={(e) => {
              handleFieldChange(e);
              if (!e.target.checked) {
                setValidationErrors((prev) => ({
                  ...prev,
                  vaccination: "Ihre Katze muss die erforderten Impfungen erhalten haben",
                }));
              } else {
                setValidationErrors((prev) => ({
                  ...prev,
                  vaccination: "",
                }));
              }
            }}
            error={validationErrors.vaccination}
          ></Checkbox>
          <DisplayList itemList={vaccList} />
        </Fieldset>
      </div>
      <RequiredText />
      {msgPlace}
      <FormControls>
        <ButtonLink isLink href="/booking" onClick={handleReset}>
          Abbrechen
        </ButtonLink>
        <ButtonLink disabled={isPending} type="submit">
          {isPending ? "Sendet Buchung..." : "Buchen"}
        </ButtonLink>
      </FormControls>
    </form>
  );
}
