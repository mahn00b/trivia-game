import { useState } from 'react';
import fetch from 'node-fetch';
import { useTimeout } from '../../hooks'
import {
  Question,
} from '../../components';

interface QuizProps {
  /** The session ID for the quiz. */
  sessionId: string;
  /** The initial questions */
  initialQuestions: Question[]
  /** A callback to retrieve the latest report. */
  onNewReportGenerated: (report: QuizReport) => void;
}

export default function Quiz({
  initialQuestions,
  onNewReportGenerated
}: QuizProps) {
  const [answer, setAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestions.shift())
  const [questions, setQuestions] = useState(initialQuestions);

  const requestMoreQuestions = async () => {
    const response = await fetch('/questions')

    // @ts-ignore
    const { questions: newQuestions, report } = await response.json()

    onNewReportGenerated(report)

    setQuestions([...questions, ...newQuestions ])
  }

  const answerQuestion = async (answer: string, _: boolean) => {
      if (questions.length < 3) await requestMoreQuestions()

      setAnswer(answer)

      useTimeout(async () => {
        const response = await fetch('/answer', {
          method: 'post',
          body: JSON.stringify({
            question: currentQuestion,
            answer
          }),
          headers: {'Content-Type': 'application/json'}
        });

        const { report } = await response.json() as { report: QuizReport }

        onNewReportGenerated(report);

        setCurrentQuestion(questions.shift())
      }, 1000)
  }

  return (
    <>
      {currentQuestion && <Question question={currentQuestion} onClickAnswer={answerQuestion} disable={answer !== ''} />}
    </>
  )
}
