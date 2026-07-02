import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const PROVIDER = process.env.AI_PROVIDER || 'gemini';

// Lazily-created singleton clients
let openaiClient: OpenAI | null = null;
let geminiClient: GoogleGenerativeAI | null = null;

function getOpenAI(): OpenAI {
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

function getGemini(): GoogleGenerativeAI {
  if (!geminiClient) {
    geminiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  }
  return geminiClient;
}

/**
 * Single entry point every AI module (testGenerator, locatorHealer,
 * visualValidator, failureAnalyzer) calls through. Swapping AI_PROVIDER
 * in .env changes the backend for the whole framework.
 *
 * @param systemPrompt  Instructions describing the task / output format
 * @param userPrompt    The actual content to reason over (DOM, error, NL prompt, etc.)
 * @param jsonMode      If true, asks the model to return strict JSON only
 */
export async function askAI(
  systemPrompt: string,
  userPrompt: string,
  jsonMode = false
): Promise<string> {
  if (PROVIDER === 'openai') {
    const client = getOpenAI();
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: jsonMode ? { type: 'json_object' } : undefined,
      temperature: 0.2,
    });
    return response.choices[0]?.message?.content?.trim() || '';
  }

  // Default: Gemini
  const genAI = getGemini();
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
    generationConfig: jsonMode ? { responseMimeType: 'application/json' } : undefined,
  });

  const result = await model.generateContent([
    { text: `${systemPrompt}\n\n${userPrompt}` },
  ]);

  return result.response.text().trim();
}

/**
 * Convenience helper for callers that expect strict JSON back from the model.
 * Strips markdown code fences defensively in case the model ignores jsonMode.
 */
export async function askAIJson<T = unknown>(
  systemPrompt: string,
  userPrompt: string
): Promise<T> {
  const raw = await askAI(systemPrompt, userPrompt, true);
  const cleaned = raw.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned) as T;
}
