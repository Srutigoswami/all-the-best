
import axios, { AxiosInstance } from 'axios';
import NodeCache from 'node-cache';
import { z } from 'zod';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const cache = new NodeCache({ stdTTL: 600 });

async function callGemini(prompt: string, cacheKey?: string) {
  if (cacheKey && cache.has(cacheKey)) return cache.get(cacheKey);
  if (!GEMINI_API_KEY) return { mock: true, result: `Mocked response for: ${prompt}` };
  
  try {
    // Use gemini-2.5-flash which is available and supports generateContent
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const response = await axios.post(url, { 
      contents: [{ parts: [{ text: prompt }] }] 
    }, {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const result = response.data;
    // Extract text from Gemini response
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (cacheKey) cache.set(cacheKey, text);
    return text;
  } catch (err: any) {
    console.error('Gemini API Error:', err.response?.data || err.message);
    throw new Error(err.response?.data?.error?.message || err.message || 'Gemini API error');
  }
}

export async function predictSeverity({ title, description }: { title: string; description: string }) {
  const prompt = `Analyze this bug report and predict its severity. Only respond with one word: "low", "medium", "high", or "critical".

Bug Title: ${title}
Bug Description: ${description}

Severity:`;
  const result = await callGemini(prompt, `severity:${title}:${description}`);
  if (typeof result === 'object' && result.mock) return 'medium';
  const text = typeof result === 'string' ? result.toLowerCase() : '';
  if (text.includes('critical')) return 'critical';
  if (text.includes('high')) return 'high';
  if (text.includes('low')) return 'low';
  return 'medium';
}

export async function estimateResolutionTime({ title, description }: { title: string; description: string }) {
  const prompt = `Estimate the resolution time in hours for this bug. Only respond with a number (e.g., 2, 4, 8, 16).

Bug Title: ${title}
Bug Description: ${description}

Estimated hours:`;
  const result = await callGemini(prompt, `time:${title}:${description}`);
  if (typeof result === 'object' && result.mock) return 4;
  const text = typeof result === 'string' ? result : '';
  const hours = parseInt(text.match(/\d+/)?.[0] || '4');
  return hours > 0 ? hours : 4;
}

export async function classifyBugType({ title, description }: { title: string; description: string }) {
  const prompt = `Classify this bug type. Respond with one word: "UI", "Backend", "API", "Database", "Performance", "Security", or "Other".

Bug Title: ${title}
Bug Description: ${description}

Type:`;
  const result = await callGemini(prompt, `type:${title}:${description}`);
  if (typeof result === 'object' && result.mock) return 'UI';
  const text = typeof result === 'string' ? result.toLowerCase() : '';
  if (text.includes('ui') || text.includes('frontend')) return 'UI';
  if (text.includes('backend') || text.includes('server')) return 'Backend';
  if (text.includes('api')) return 'API';
  if (text.includes('database') || text.includes('db')) return 'Database';
  if (text.includes('performance')) return 'Performance';
  if (text.includes('security')) return 'Security';
  return 'Other';
}

export async function generateSummary(input: any) {
  const prompt = `Generate summary for bug: ${JSON.stringify(input)}`;
  const result = await callGemini(prompt);
  if (result.mock) return result.result;
  return result.summary || 'No summary';
}

export async function findDuplicates(input: any) {
  // Simple local similarity fallback
  if (!GEMINI_API_KEY) {
    return { duplicates: [] };
  }
  const prompt = `Find duplicates for: ${JSON.stringify(input)}`;
  const result = await callGemini(prompt);
  return result.duplicates || [];
}

export async function recommendPriority(input: any) {
  const prompt = `Recommend priority for this bug. Only respond with one word: "low", "medium", or "high".

Bug Details: ${JSON.stringify(input)}

Priority:`;
  const result = await callGemini(prompt);
  if (typeof result === 'object' && result.mock) return 'medium';
  const text = typeof result === 'string' ? result.toLowerCase() : '';
  if (text.includes('high')) return 'high';
  if (text.includes('low')) return 'low';
  return 'medium';
}

export async function analyzeSentiment(input: any) {
  const prompt = `Analyze sentiment for: ${JSON.stringify(input)}`;
  const result = await callGemini(prompt);
  return result.sentiment || 'neutral';
}

export async function parseQuery(input: any) {
  const prompt = `Parse query: ${JSON.stringify(input)}`;
  const result = await callGemini(prompt);
  return result.query || {};
}

export default {
  predictSeverity,
  estimateResolutionTime,
  classifyBugType,
  generateSummary,
  recommendPriority,
  findDuplicates,
  analyzeSentiment,
  parseQuery
};
