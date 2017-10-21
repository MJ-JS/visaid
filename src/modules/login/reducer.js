
const initialState = {
  username: undefined,
  password: undefined,
  loggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FORM_CHANGE': {
      const {
        name,
        value,
      } = action;

      return {
        ...state,
        [name]: value,
      };
    }

    case 'ON_SUBMIT': {
      return {
        ...state,
        loggedIn: true,
      };
    }

    default:
      return state;
  }
};

export default reducer;
