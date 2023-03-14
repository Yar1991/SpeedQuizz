import { ref, computed } from "vue";
import { defineStore } from "pinia";

export interface ItemInterface {
  title: string;
  icon: string;
  image: string;
}

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

interface MistakeInterface {
  question: string;
  correctAnswer: string;
  userAnswer: string;
}

export const useQuizStore = defineStore("quiz", () => {
  const isModalOpen = ref<boolean>(false);
  const items = ref<ItemInterface[]>([] as ItemInterface[]);
  const searchInput = ref<string>("");
  const pickedItem = ref<string>("");
  const questionsLimit = ref<number>(10);
  const questions = ref<QuestionInterface[]>([]);
  const mistakes = ref<MistakeInterface[]>([]);
  const showMistakes = ref<boolean>(false);
  const completedQuestionsCount = ref<number>(1);
  const gameTimer = ref<number>(0);

  const searchItems = computed(() => {
    return items.value.filter((item) =>
      item.title.includes(searchInput.value.toLowerCase())
    );
  });

  return {
    isModalOpen,
    items,
    searchInput,
    searchItems,
    pickedItem,
    questions,
    completedQuestionsCount,
    questionsLimit,
    gameTimer,
    mistakes,
    showMistakes,
  };
});
