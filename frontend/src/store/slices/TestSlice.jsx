

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  test: null,
  currentIndex: 0, // Initialize currentIndex to 0
};

const TestSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setTest(state, action) {
      state.test = action.payload;
    },
    selectOption(state, action) {
      const { questionId, optionId } = action.payload;
    
      
      const question = state.test?.test?.questions?.find(q => q._id === questionId);
      console.log(question)
      if (question) {
        question.options.forEach(option => {
          if (option._id === optionId) {
            option.isCorrect=(!option.isCorrect);
           
          }
          else {
            option.isCorrect=false;
          }
        });
      }
    
    },

   selectOptions(state, action) {
      const { questionId, optionId } = action.payload;
    
      
      const question = state.test?.test?.questions?.find(q => q._id === questionId);
      console.log(question)
      if (question) {
        question.options.forEach(option => {
          if (option._id === optionId) {
            option.isCorrect=(!option.isCorrect);
           
          }
          // else {
          //   option.isCorrect=false;
          // }
        });
      }
    
    },
    updateIntegerAnswer(state, action) {
      const { questionId, integerAns } = action.payload;
      const question = state.test?.test?.questions?.find(q => q._id === questionId);
      if (question) {
        question.integerAns = integerAns;
      }
    },
    updateDecimalAnswer(state, action) {
      const { questionId, lowDecimal, highDecimal } = action.payload;
      const question = state.test?.test?.questions?.find(q => q._id === questionId);
      if (question) {
        question.lowDecimal = lowDecimal;
        question.highDecimal = highDecimal;
      }
    }
    ,
    setQuestionIndex(state, action) {
      state.currentIndex = action.payload;
    },
  
  },
});

// export const TestActions = TestSlice.actions;
export const { setTest, selectOption, setQuestionIndex,selectOptions } = TestSlice.actions;
export const TestActions=TestSlice.actions;
export { TestSlice };
