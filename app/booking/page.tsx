import classes from "./page.module.css";
import BookingForm from "@/components/BookingForm/BookingForm";
import PageHeader from "@/components/PageHeader/PageHeader";
import FormWrapper from "@/components/FormWrapper/FormWrapper";

export default function Booking() {
  return (
    <FormWrapper>
      <div className={classes.bookingFormContainer}>
        <PageHeader>
          <span className={classes.bookingFormHeader}>Aufenthalt buchen</span>
        </PageHeader>
        <BookingForm />
      </div>
    </FormWrapper>
  );
}
