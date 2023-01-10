export function convertAttributesToQueryString(obj: AttributeMap = {}) {
  return Object.keys(obj).map((argName) => {
    const value = obj[argName];

    if (typeof value === 'boolean') {
      return `${argName}${ value ? '' : '=false'}`
    }

    return `${argName}=${value}`
  }).join('&');
}

export function tallyQuestions(questions: Question[]): number[] {
  return questions.reduce((acc, question) => {
    const { difficulty } = question

    switch(difficulty) {
      case 'easy':
        acc[0]++;
        break;
      case 'medium':
        acc[1]++;
        break;
      case 'hard':
        acc[2]++;
        break;
    }

    return acc;

  }, [0, 0, 0])
}

export function validateAnswer({ correct_answer }: Question, response: string): boolean {
  return response === correct_answer;
}
