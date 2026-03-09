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
import { transformFormDataToPlainObject } from "@/components/BookingForm/bookingFormHelper";
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

export default function BookingForm() {
  const [state, dispatch, isPending] = useActionState(createNewBooking, { errors: {} });
  const [startDate, setStartDate] = useState(state.enteredValues?.firstDayRaw || "");
  const [formKey, setFormKey] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const { validationErrors, setValidationErrors, validate, initValidation } = useBookingValidation();

  const serverResponseKey = JSON.stringify(state.errors) + (state.success ? "-success" : "");

  const handleReset = useCallback(() => {
    setValidationErrors(initValidation);
    setStartDate("");
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

  const backendMsg = state.errors?._form || state.errors?.catAmount || state.errors?.dates || state.errors?.room;
  let msgPlace;
  if (showSuccess) {
    msgPlace = <p className={classes.success}>Buchung erfolgreich</p>;
  } else if (backendMsg) {
    msgPlace = <p className={classes.error}>{backendMsg}</p>;
  } else {
    msgPlace = <p className={classes.placeholder}>Placeholder</p>;
  }

  const formAction = (formData: FormData) => {
    const transformedData = transformFormDataToPlainObject(formData);
    const result = bookingSchema.safeParse(transformedData);

    if (!result.success) {
      const treefieldErrors = z.treeifyError(result.error);
      const contactProps = treefieldErrors.properties?.contactInfo?.properties;
      const catInfoProps = treefieldErrors.properties?.catInfo?.properties;

      setValidationErrors({
        room: treefieldErrors.properties?.room?.errors[0] || "",
        startDate: treefieldErrors.properties?.firstDay?.errors[0] || "",
        endDate: treefieldErrors.properties?.lastDay?.errors[0] || "",
        firstName: contactProps?.firstName?.errors[0] || "",
        lastName: contactProps?.lastName?.errors[0] || "",
        street: contactProps?.street?.errors[0] || "",
        houseNumber: contactProps?.houseNumber?.errors[0] || "",
        postalCode: contactProps?.postalCode?.errors[0] || "",
        city: contactProps?.city?.errors[0] || "",
        email: contactProps?.email?.errors[0] || "",
        phoneNumber: contactProps?.phoneNumber?.errors[0] || "",
        catAmount: catInfoProps?.catAmount?.errors[0] || "",
        medication: catInfoProps?.medication?.errors[0] || "",
        vaccination: catInfoProps?.vaccination?.errors[0] || "",
      });
    }

    dispatch(transformedData);
  };

  const calcTwoWeeks = calcTwoWeeksFunc(startDate) || oneYearFromNow;
  const theDayAfterStart = startDate ? theDayAfterStartFunc(startDate) : currentDate;
  return (
    <form action={formAction} className={classes.bookingForm} key={formKey}>
      <div className={classes.formDates}>
        <FormRowItem fixedSize>
          <Dropdown
            isRoom
            key={`room-${serverResponseKey}`}
            label="Raum *"
            name="room"
            defValue={state.enteredValues?.room}
            data={rooms}
            error={validationErrors.room}
            required
            onBlur={validate}
            onChange={validate}
          />
        </FormRowItem>
        <FormRowItem fixedSize>
          <DatePicker
            name="startDate"
            label="Erster Tag *"
            min={currentDate}
            max={oneYearFromNow}
            defValue={state.enteredValues?.firstDayRaw}
            required
            onChange={(e) => {
              setStartDate(e.target.value);
              validate(e);
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
            defValue={state.enteredValues?.lastDayRaw}
            onChange={validate}
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
                defValue={state.enteredValues?.firstName}
                onBlur={validate}
                error={validationErrors.firstName}
                required
              />
            </FormRowItem>
            <FormRowItem>
              <Input
                type="text"
                name="lastName"
                label="Nachname *"
                defValue={state.enteredValues?.lastName}
                onBlur={validate}
                error={validationErrors.lastName}
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
                defValue={state.enteredValues?.street}
                onBlur={validate}
                error={validationErrors.street}
                required
              />
            </FormRowItem>
            <FormRowItem>
              <Input
                type="text"
                name="houseNumber"
                label="Hausnummer *"
                defValue={state.enteredValues?.houseNumber}
                onBlur={validate}
                error={validationErrors.houseNumber}
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
                defValue={state.enteredValues?.postalCode}
                onBlur={validate}
                error={validationErrors.postalCode}
                isShortInput
                required
              />
            </FormRowItem>
            <FormRowItem>
              <Input
                type="text"
                name="city"
                label="Stadt *"
                defValue={state.enteredValues?.city}
                onBlur={validate}
                error={validationErrors.city}
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
                defValue={state.enteredValues?.email}
                onBlur={validate}
                error={validationErrors.email}
                required
              />
            </FormRowItem>
            <FormRowItem>
              <Input
                type="text"
                name="phoneNumber"
                label="Telefonnummer *"
                defValue={state.enteredValues?.phoneNumber}
                onBlur={validate}
                error={validationErrors.phoneNumber}
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
              key={`catAmount-${serverResponseKey}`}
              label="Anzahl Katzen * "
              name="catAmount"
              data={catAmount}
              defValue={state.enteredValues?.catAmount}
              error={validationErrors.catAmount}
              onBlur={validate}
              onChange={validate}
              required
            />
          </FormRowItem>
          <CareSection header="Medikamente" text="Benötigt eine oder mehrere Katzen täglich Medikamente?">
            <div className={classes.careSection}>
              <FormRowItem>
                <TextArea
                  name="medication"
                  label="Bitte hier Name, Dosis und Einnahmezeitraum der Medikamente auflisten."
                  defValue={state.enteredValues?.medication}
                  error={validationErrors.medication}
                  onBlur={validate}
                ></TextArea>
              </FormRowItem>
            </div>
          </CareSection>
          <Checkbox
            key={`vaccination-${serverResponseKey}`}
            label="Hiermit bestätige ich, dass alle abzugebenden Tiere bei folgender Medikation auf aktuellem Stand (nicht älter als 1 Jahr) sind: *"
            name="vaccination"
            defValue={state.enteredValues?.vaccination}
            required
            onChange={validate}
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
