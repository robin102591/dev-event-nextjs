import mongoose, { Schema, Document, Model } from "mongoose";
import Event from "./event.model";

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => {
          // RFC 5322 compliant email regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please provide a valid email address",
      },
    },
  },
  {
    timestamps: true,
  },
);

// Pre-save hook to validate that the referenced event exists
BookingSchema.pre("save", async function () {
  const booking = this as IBooking;
  // Only validate eventId if it's modified or document is new
  if (this.isModified("eventId") || booking.isNew) {
    const eventExists = await Event.findById(this.eventId);
    if (!eventExists) {
      const error = new Error("Referenced event does not exist");
      error.name = "ValidationError";
      throw error;
    }
  }
});

// Create index on eventId for faster queries
BookingSchema.index({ eventId: 1 });

// Prevent model recompilation in development
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
