import fetch from 'node-fetch'
import { convertAttributesToQueryString } from '../utils';

const BASE_URL = 'https://opentdb.com';

interface TokenResponse {
  response_code: number;
  response_message: string;
  token: string
}

declare interface QuestionOptions {
  amount?: number;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  type?: 'boolean' | 'multiple';
}

export async function requestNewSessionToken(): Promise<string> {
    const response = await fetch(`${BASE_URL}/api_token.php?command=request`)
    const {
      token,
      response_code,
      response_message,
    } = await response.json() as TokenResponse;

    if (response_code !== 0) throw new Error(response_message)

    return token;
}

declare interface QuizResponse {
  response_code: number;
  results: Question[];
}

export async function getNewQuestions(sessionToken: string, options: QuestionOptions = {}): Promise<Question[]> {
    const defaultOptions= {
      amount: 10,
    }

    const queryString = convertAttributesToQueryString({ ...defaultOptions, ...options});

    const url = `${BASE_URL}/api.php?${queryString}&token=${sessionToken}`;

    const response = await fetch(url);
    const {
      response_code,
      results,
    } = await response.json() as QuizResponse;

    if (response_code !== 0) throw new Error(response_code.toString())

    return results;
}

export async function endSession(sessionToken: string) {
  const response = await fetch(`${BASE_URL}/api_token.php?command=reset&token=${sessionToken}`)

  const {
    response_code,
    token
  } = await response.json() as Partial<TokenResponse>
}
