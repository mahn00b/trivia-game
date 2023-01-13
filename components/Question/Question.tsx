import { useState, useEffect } from 'react';
import styles from './Question.module.scss';

interface QuestionProps {
  /** The question/answers to display. */
  question: Question;
  /** Callback to notify the parent when a question has been answer */
  onClickAnswer: (answer: string, isCorrect: boolean) => void;
  /** Toggles whether the selection should be marked on response. Default is true. */
  shouldHighlightResponse?: boolean;
  /** Disable the ability to select an answer. Default is false. */
  disable?: boolean
  /** An ID used in testing to target the dom elements. */
  dataTestid?: string
}

export default function Question({
  question: {
    question,
    correct_answer,
    incorrect_answers,
  },
  onClickAnswer = () => {},
  shouldHighlightResponse = true,
  disable = false,
  dataTestid = ''
}: QuestionProps) {
  const [selection, setSelection] = useState('');

  useEffect(() => {
    setSelection('');
  }, [question]);

  // sort the answers alphabetically so the correct answer isn't always in the same place.
  const answers = [...incorrect_answers, correct_answer].sort();

  const isCorrect = selection === correct_answer && shouldHighlightResponse;
  const isIncorrect = selection !== correct_answer && shouldHighlightResponse;

  const handleAnswerClick = (response: string) => {
    if (disable) return;

    onClickAnswer(response, response === correct_answer);
    setSelection(response);
  };

  return (
    <div className={`${styles.Question} ${disable && styles.disable}`} data-testid={dataTestid}>
      <h3
        className={styles.question}
        dangerouslySetInnerHTML={{ __html: question }}
        data-testid={dataTestid && `${dataTestid}-question`}
      />
      <ul className={styles.container} data-testid={dataTestid && `${dataTestid}-answers`}>
        {answers.map((ans) => (
          <li
            className={`${styles.answer} ${ans === selection && styles.selection} ${isCorrect && styles.correct} ${isIncorrect && styles.incorrect}`}
            onClick={() => { handleAnswerClick(ans); }}
            key={ans}
            data-testid={correct_answer === ans && dataTestid && `${dataTestid}-correct-answer`}
          >
            {ans}
            <div className={styles.circle}></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
