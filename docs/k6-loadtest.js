import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 20 }, // ramp up
    { duration: '3m', target: 20 }, // steady
    { duration: '1m', target: 0 },  // ramp down
  ],
};

const BASE_URL = __ENV.BASE_URL || 'https://your-alb-url';

export default function () {
  // Simulate Report Bug
  let bugRes = http.post(`${BASE_URL}/api/bugs`, JSON.stringify({
    title: 'Test bug',
    description: 'Load test bug',
    product: 'Test',
    component: 'API',
    priority: 'High',
  }), { headers: { 'Content-Type': 'application/json' } });
  check(bugRes, { 'bug reported': (r) => r.status === 201 });

  // Simulate AI Playground
  let aiRes = http.post(`${BASE_URL}/api/ai/predict`, JSON.stringify({
    title: 'Test bug',
    description: 'Load test bug',
    product: 'Test',
    component: 'API',
    priority: 'High',
  }), { headers: { 'Content-Type': 'application/json' } });
  check(aiRes, { 'AI responded': (r) => r.status === 200 });

  sleep(1);
}
