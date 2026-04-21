const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');
const Member  = require('../models/Member');

// ── Multer config — save images to uploads/ folder ───────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    // unique filename: timestamp + original name
    cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '_'));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
  limits: { fileSize: 5 * 1024 * 1024 }  // 5MB max
});

// ── POST /api/members — Add new member ───────────────────
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, role, email, phone, department, bio } = req.body;

    if (!name || !role || !email) {
      return res.status(400).json({ message: 'Name, role and email are required' });
    }

    const member = new Member({
      name, role, email, phone, department, bio,
      image: req.file ? req.file.filename : ''
    });

    await member.save();
    res.status(201).json({ message: 'Member added successfully', member });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── GET /api/members — Get all members ───────────────────
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── GET /api/members/:id — Get single member ─────────────
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── DELETE /api/members/:id — Delete member ──────────────
router.delete('/:id', async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
