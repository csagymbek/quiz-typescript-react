import { shuffleArray } from './utils';

export type Question = {
    category: string;
    correct_answer: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & { answers: string[] }

export enum difficulty {
    easy = "easy",
    medium = "medium",
    hard = "hard",
}
export const fetchQuizQuestions = async (amount: number, difficulty: difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    const { results } = await (await fetch(endpoint)).json()
    return results?.map((question: Question) => (
        { ...question, answers: shuffleArray([...question.incorrect_answers, question.correct_answer]) }
    ))
}