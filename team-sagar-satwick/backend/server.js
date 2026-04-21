const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const path     = require('path');
require('dotenv').config();

const app = express();

// ── Middleware ────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Routes ────────────────────────────────────────────────
app.use('/api/members', require('./routes/members'));

// ── MongoDB Connection ─────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected — team_sagar_satwick database');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
      console.log(`📁 Images served at http://localhost:${process.env.PORT}/uploads`);
    });
  })
  .catch(err => console.error('❌ MongoDB Error:', err));
