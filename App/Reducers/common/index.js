import * as Types from "../../ActionTypes";
const initialState = {
  error : false
};

export default (user = (state = initialState, action) => {
  switch (action.type) {
    case Types.CLEARERROR:
        return {
          error : false
        }
    case Types.MAKEERROR:
        return {
          error : true
        }
    default:
      return state;
  }
});
