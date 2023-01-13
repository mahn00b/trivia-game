import { render, fireEvent } from '@testing-library/react';
import { Question as testQuestion } from '../../fixtures';
import Question from './Question';

describe('Question', () => {
  let TEST_QUESTION: Question;
  const TEST_ID = 'TEST_ID';

  beforeEach(() => {
    // creates a deep copy of the Quest
    TEST_QUESTION = JSON.parse(JSON.stringify(testQuestion)) as Question;
  });

  it ('should be defined', () => {
    expect(Question).toBeDefined();
  });

  it('should render in the dom', async () => {
    const mock = jest.fn();

    const { queryByTestId } = render(<Question question={TEST_QUESTION} onClickAnswer={mock} dataTestid={TEST_ID}/>);
    const result = queryByTestId(TEST_ID);

    expect(result).toBeInTheDocument();
  });

  it('should render the question and the answer text', async () => {
    const mock = jest.fn();

    const { queryByText } = render(<Question question={TEST_QUESTION} onClickAnswer={mock} dataTestid={TEST_ID}/>);

    const {
      question,
      correct_answer,
      incorrect_answers
    } = TEST_QUESTION;

    expect(queryByText(question)).toBeInTheDocument();
    expect(queryByText(correct_answer)).toBeInTheDocument();
    incorrect_answers.forEach((ans) => { expect(queryByText(ans)).toBeInTheDocument(); });
  });

  it('should call the callback when an answer is clicked', async () => {
    const mock = jest.fn((ans, isCorrect) => [ans, isCorrect]);

    const { queryByText } = render(<Question question={TEST_QUESTION} onClickAnswer={mock} dataTestid={TEST_ID}/>);

    const {
      correct_answer,
    } = TEST_QUESTION;

    const correctElement = queryByText(correct_answer);

    expect(correctElement).toBeDefined();

    fireEvent.click(correctElement as HTMLElement);

    expect(mock).toHaveBeenCalled();
  });

  it('should indicate when the correct answer is click by adding the correct class', async () => {
    const mock = jest.fn((ans, isCorrect) => [ans, isCorrect]);

    const { queryByText } = render(<Question question={TEST_QUESTION} onClickAnswer={mock} dataTestid={TEST_ID}/>);

    const {
      correct_answer,
    } = TEST_QUESTION;

    const correctElement = queryByText(correct_answer);

    expect(correctElement).toBeDefined();

    fireEvent.click(correctElement as HTMLElement);

    expect(mock).toHaveBeenCalled();

    // get return items from the last call
    const [ans, correct] = mock.mock.calls[mock.mock.calls.length - 1];

    expect(ans).toEqual(correct_answer);
    expect(correct).toBe(true);
    expect(correctElement).toHaveClass('correct');
  });

  it('should indicate when the incorrect answer is click by adding the incorrect class', async () => {
    const mock = jest.fn((ans, isCorrect) => [ans, isCorrect]);

    const { queryByText } = render(<Question question={TEST_QUESTION} onClickAnswer={mock} dataTestid={TEST_ID}/>);

    const {
      incorrect_answers,
    } = TEST_QUESTION;

    const [incorrect_answer] = incorrect_answers;

    const incorrectElement = queryByText(incorrect_answer);

    expect(incorrectElement).toBeDefined();

    fireEvent.click(incorrectElement as HTMLElement);

    expect(mock).toHaveBeenCalled();

    // get return items from the last call
    const [ans, correct] = mock.mock.calls[mock.mock.calls.length - 1];

    expect(ans).toEqual(incorrect_answer);
    expect(correct).toBe(false);
    expect(incorrectElement).toHaveClass('incorrect');
  });
});
