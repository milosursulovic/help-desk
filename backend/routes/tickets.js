import express from "express";
import Ticket from "../models/Ticket.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const tickets = await Ticket.find().sort({ createdAt: -1 });
  res.json(tickets);
});

router.post("/", async (req, res) => {
  const { title, description, createdBy } = req.body;
  try {
    const newTicket = new Ticket({ title, description, createdBy });
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    res.json(ticket);
  } catch {
    res.status(404).json({ error: "Ticket not found" });
  }
});

router.put("/:id", async (req, res) => {
  const { status, comment, author } = req.body;
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    if (status) ticket.status = status;
    if (comment) ticket.comments.push({ message: comment, author });

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
