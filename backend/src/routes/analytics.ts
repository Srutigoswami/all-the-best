import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const BUGS_FILE = path.join(__dirname, '../../data/bugs.json');

router.get('/', (req, res) => {
  try {
    const bugs = JSON.parse(fs.readFileSync(BUGS_FILE, 'utf-8'));
    const total = bugs.length;
    const byStatus = bugs.reduce((acc: any, bug: any) => {
      acc[bug.status || 'open'] = (acc[bug.status || 'open'] || 0) + 1;
      return acc;
    }, {});
    const bySeverity = bugs.reduce((acc: any, bug: any) => {
      acc[bug.severity || 'unknown'] = (acc[bug.severity || 'unknown'] || 0) + 1;
      return acc;
    }, {});
    res.json({ total, byStatus, bySeverity });
  } catch (err) {
    res.status(500).json({ error: 'Failed to aggregate analytics' });
  }
});

export default router;
