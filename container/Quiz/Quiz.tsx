import { useState, useRef, useEffect } from 'react';
import fetch from 'node-fetch';
import {
  Question,
} from '../../components';

interface QuizProps {
  /** The initial questions */
  initialQuestions: Question[]
  /** A callback to retrieve the latest report. */
  onNewReportGenerated: (report: QuizReport) => void;
  /** An id used to target the element and children during testing. */
  dataTestid?: string
}

export default function Quiz({
  initialQuestions,
  onNewReportGenerated,
  dataTestid
}: QuizProps) {
  const [answer, setAnswer] = useState('');
  const timerref = useRef<NodeJS.Timeout>();
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [currentQuestion, setCurrentQuestion] = useState<Question>();

  useEffect(() => {
    if (!currentQuestion) setCurrentQuestion(questions.shift());
  }, []);

  useEffect(() => {
    if (answer === '') return;

    timerref.current = setTimeout(() => {

      setCurrentQuestion(questions.shift());
      setAnswer('');

      if (questions.length <= 3) requestMoreQuestions();

    }, 1000);

    return (() => {
      clearTimeout(timerref.current);
    });
  }, [answer]);

  const answerQuestion = async (ans: string, _: boolean) => {
    setAnswer(ans);

   const response = await fetch('/api/answer', {
      method: 'post',
      body: JSON.stringify({
        question: currentQuestion,
        answer: ans,
      }),
      headers: {'Content-Type': 'application/json'}
    });

    const { report } = await response.json();

    onNewReportGenerated(report);
  };

  const requestMoreQuestions = async () => {
    const response = await fetch('/api/questions');

    // @ts-ignore
    const { questions: newQuestions, report } = await response.json();

    onNewReportGenerated(report);

    setQuestions([...questions, ...newQuestions ]);
  };

  return (
    <>
      {currentQuestion && <Question question={currentQuestion} onClickAnswer={answerQuestion} disable={answer !== ''} dataTestid={dataTestid} />}
    </>
  );
}
