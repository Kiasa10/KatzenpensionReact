import classes from "./page.module.css";
import BookingForm from "@/components/BookingForm/BookingForm";
import PageHeader from "@/components/PageHeader/PageHeader";

export default function Booking() {
  return (
    <div className={classes.bookingFormContainer}>
      <PageHeader>
        <span className={classes.bookingFormHeader}>Aufenthalt buchen</span>
      </PageHeader>
      <BookingForm />
    </div>
  );
}
