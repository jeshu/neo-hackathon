const initialState = {
  isLoggedIn: false,
};
const LoginReducer = (state = initialState, { type, payload }) => {
  console.log(type, payload);
  switch (type) {
    case 'LOGIN':
      return { ...state, ...payload };

    default:
      return state;
  }
};
export default LoginReducer;
