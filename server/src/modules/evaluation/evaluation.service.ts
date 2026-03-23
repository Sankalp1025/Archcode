import { callAI } from "../ai/ai.service";

// define a type for parsed output
type ParsedAnswer = string;

export const parseAnswer = async (answer: string): Promise<ParsedAnswer> => {
  return callAI(`Extract components from: ${answer}`);
};

export const scoreAnswer = async (parsed: ParsedAnswer): Promise<string> => {
  return callAI(`Score this system design: ${parsed}`);
};

export const generateFeedback = async (parsed: ParsedAnswer): Promise<string> => {
  return callAI(`Give detailed feedback: ${parsed}`);
};

export const detectWeakness = async (parsed: ParsedAnswer): Promise<string> => {
  return callAI(`Find weaknesses: ${parsed}`);
};