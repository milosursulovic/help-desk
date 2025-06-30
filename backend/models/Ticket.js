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
      enum: ["Open", "In Progress", "Resolved"],
      default: "Open",
    },
    createdBy: String,
    comments: [commentSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
