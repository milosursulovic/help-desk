import express from "express";
import Ticket from "../models/Ticket.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const total = await Ticket.countDocuments();
    const tickets = await Ticket.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      data: tickets,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
});

router.get("/by-ip", async (req, res) => {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded ? forwarded.split(",")[0] : req.socket.remoteAddress;

  try {
    const tickets = await Ticket.find({ ipAddress: ip }).sort({
      createdAt: -1,
    });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tickets by IP" });
  }
});

router.post("/", async (req, res) => {
  const { title, description, createdBy } = req.body;

  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded ? forwarded.split(",")[0] : req.socket.remoteAddress;

  try {
    const newTicket = new Ticket({
      title,
      description,
      createdBy,
      ipAddress: ip,
    });
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
