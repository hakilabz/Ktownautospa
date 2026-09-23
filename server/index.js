import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';

// Load environment variables from .env if present
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Security hardening
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Middleware
app.use(cors());

// Webhook endpoint needs raw body, so apply JSON parsing to everything else
app.use((req, res, next) => {
  if (req.originalUrl === '/api/webhook') {
    next();
  } else {
    express.json({ limit: '10mb' })(req, res, next);
  }
});

app.use(express.urlencoded({ extended: true }));

// Mount API routes
app.use('/api', apiRouter);

// Serve static frontend in production build & public assets
const distPath = path.join(__dirname, '../dist');
const publicPath = path.join(__dirname, '../public');
app.use(express.static(distPath));
app.use(express.static(publicPath));

// Fallback to index.html for SPA client-side routes
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isMain) {
  app.listen(PORT, () => {
    console.log(`🚗 Ktown Auto Spa Server running on http://localhost:${PORT}`);
    console.log(`💳 Stripe Status: ${process.env.STRIPE_SECRET_KEY ? 'Configured (Live/Test)' : 'Pending (.env template ready)'}`);
  });
}

export default app;


