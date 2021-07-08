const initialState = {};

const RawMaterialReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'DATA_SAVE_INIT':
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default RawMaterialReducer;
