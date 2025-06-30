import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now },
  author: String,
});

const ticketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: ["Otvoren", "U toku", "Završen"],
      default: "Otvoren",
    },
    createdBy: String,
    ipAddress: String,
    comments: [
      {
        message: String,
        timestamp: { type: Date, default: Date.now },
        author: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
