const initialState = {};

const RawMaterialReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SAVE_DATA':
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default RawMaterialReducer;
