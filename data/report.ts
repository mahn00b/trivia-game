import type { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies, setCookie, destroyCookie } from 'nookies'

const COOKIE_KEY = 'QUIZ_REPORT_KEY'

// Make the age six months. The same as trivia APIs session life.
const SIX_MONTHS = 6 * 30 * 24 * 60 * 60

export function getQuizReport(req: NextApiRequest): QuizReport | null {
  const reportString = parseCookies({ req }, { path: '/' })[COOKIE_KEY]

  if (!reportString) return null;

  const report: QuizReport = JSON.parse(reportString)

  return report;
}

export function setQuizReport(res: NextApiResponse, report: QuizReport) {
  const timeStamp = new Date().getTime();

  report.updatedAt = timeStamp;

  if(!report.createdAt) report.createdAt = timeStamp;

  setCookie({ res }, COOKIE_KEY, JSON.stringify(report), {
      maxAge: SIX_MONTHS,
      path: '/',
  })
}

export function deleteQuizReport(res: NextApiResponse) {
  destroyCookie({ res }, COOKIE_KEY, { path: '/' });
}
