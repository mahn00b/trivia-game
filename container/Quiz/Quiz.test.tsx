import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { Question, QuizReport } from '../../fixtures';
import Quiz from './Quiz';
import * as fetch from 'node-fetch';
import { resolveTypeReferenceDirective } from 'typescript';

describe('Quiz', () => {
  const TEST_ID = 'TEST_ID';
  let mockQuestions: Question[], mockReport: QuizReport, mockFetch: jest.Mock;
  beforeEach(() => {
    mockQuestions = new Array(10).fill('').map((_, index) => JSON.parse(JSON.stringify({ ...Question, question: Question.question + index})));
    mockReport = JSON.parse(JSON.stringify(QuizReport));

    // Mock the JSON responses for both /answer and /questions
    // @ts-ignore
    mockFetch = jest.spyOn(fetch, 'default').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ questions: mockQuestions, report: mockReport })
    });

    jest.useFakeTimers();
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
    // cleanup any timers
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it ('should be defined', () => {
    expect(Quiz).toBeDefined();
  });

  it ('should render in the dom', () => {
    const mock = jest.fn((report) => report);

    const { queryByTestId } = render(<Quiz initialQuestions={mockQuestions} onNewReportGenerated={mock} dataTestid={TEST_ID} />);

    expect(queryByTestId(TEST_ID)).toBeInTheDocument();
  });

  it ('should call the onNewReport callback when a question is answered', async () => {
    const mock = jest.fn((report) => report);

    const { queryByTestId } = render(<Quiz initialQuestions={mockQuestions} onNewReportGenerated={mock} dataTestid={TEST_ID} />);

    const correctAnswerElement = queryByTestId(`${TEST_ID}-correct-answer`);

    expect(correctAnswerElement).toBeInTheDocument();

    act(() => { fireEvent.click(correctAnswerElement as HTMLElement); });

    await waitFor(() => {
      expect(mock).toBeCalled();
    });
  });

  it ('should call the /questions endpoint when there are 3 questions left', async () => {
    const mock = jest.fn((report) => report);

    const { queryByTestId, rerender } = render(<Quiz initialQuestions={mockQuestions} onNewReportGenerated={mock} dataTestid={TEST_ID} />);

    let count = 1;

    while(count < 7) {
      const correctAnswerElement = queryByTestId(`${TEST_ID}-correct-answer`);

      expect(correctAnswerElement).toBeInTheDocument();

      await act(async () => { fireEvent.click(correctAnswerElement as HTMLElement); });


      await waitFor(() => {
        expect(mockFetch).toBeCalledTimes(count);
        count++;

        // wait for timeout delay
      }, { timeout: 3000 });
      jest.runAllTimers();
      rerender(<Quiz initialQuestions={mockQuestions} onNewReportGenerated={mock} dataTestid={TEST_ID} />);
    }

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(count);

      const [path] = mockFetch.mock.lastCall;
      expect(path).toContain('/api/questions');
    }, { timeout: 3000 });
  });
});
