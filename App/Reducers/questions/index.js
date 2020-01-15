import * as Types from "../../ActionTypes";
const initialState = {
  isSetQuestionType:false,
  questionTypeName:'',
  questionTypeId:'',
  isSetQuestions:false,
  isCompleted : false,
  loadingFaild : false,
  questions : [],
  results : []
};

export default (user = (state = initialState, action) => {
  switch (action.type) {
    case Types.SETQUESTIONS:
        return {
          ...state,
          isSetQuestions:true,
          questions :action.payload,
        }
    case Types.COMPLETEQUIZ:
        return {
          ...state,
          isCompleted : true,
          results : action.payload
        }
    case Types.SETQUESTIONTYPE:
        return {
          ...state,
          questionTypeName:action.payload.questiontype,
          questionTypeId:action.payload.id,
          isSetQuestionType:true,
          results : [],
          isCompleted : false,
        }
    default:
      return state;
  }
});
