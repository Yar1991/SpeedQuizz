interface QuestionInterface {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  tags: string[];
  type: string;
  difficulty: string;
  regions: [];
  isNiche: boolean;
}

export function addToLocal(questions: QuestionInterface[]) {
  localStorage.setItem("questions", JSON.stringify(questions));
}

export function getFromLocal() {
  if (localStorage.getItem("questions")) {
    const questions = JSON.parse(localStorage.getItem("questions") as string);
    return questions;
  } else {
    return [];
  }
}
