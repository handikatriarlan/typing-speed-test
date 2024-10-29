import { create } from 'zustand';

interface TypingStore {
  text: string;
  userInput: string;
  isStarted: boolean;
  startTime: number | null;
  wpm: number;
  accuracy: number;
  elapsedTime: number;
  setUserInput: (input: string) => void;
  startTest: () => void;
  resetTest: () => void;
  updateStats: () => void;
}

const sampleText = "The quick brown fox jumps over the lazy dog. Programming is both an art and a science, requiring creativity and logical thinking. Practice makes perfect when it comes to typing speed and accuracy.";

export const useTypingStore = create<TypingStore>((set, get) => ({
  text: sampleText,
  userInput: '',
  isStarted: false,
  startTime: null,
  wpm: 0,
  accuracy: 100,
  elapsedTime: 0,
  
  setUserInput: (input) => {
    set({ userInput: input });
    get().updateStats();
  },
  
  startTest: () => {
    set({
      isStarted: true,
      startTime: Date.now(),
      userInput: '',
      wpm: 0,
      accuracy: 100,
      elapsedTime: 0,
    });
  },
  
  resetTest: () => {
    set({
      isStarted: false,
      startTime: null,
      userInput: '',
      wpm: 0,
      accuracy: 100,
      elapsedTime: 0,
    });
  },
  
  updateStats: () => {
    const state = get();
    if (!state.startTime || !state.isStarted) return;

    const currentTime = Date.now();
    const elapsedTime = (currentTime - state.startTime) / 1000 / 60; // in minutes
    
    // Calculate WPM
    const wordsTyped = state.userInput.trim().split(/\s+/).length;
    const wpm = Math.round(wordsTyped / elapsedTime);
    
    // Calculate accuracy
    let correctChars = 0;
    const userInputLength = state.userInput.length;
    for (let i = 0; i < userInputLength; i++) {
      if (state.userInput[i] === state.text[i]) {
        correctChars++;
      }
    }
    const accuracy = Math.round((correctChars / userInputLength) * 100) || 100;
    
    set({
      wpm,
      accuracy,
      elapsedTime: Math.round(elapsedTime * 60), // convert to seconds
    });
  },
}));