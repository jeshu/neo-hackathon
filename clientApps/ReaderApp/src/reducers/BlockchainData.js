const initialState = {};

const BlockchainData = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SAVE_DATA':
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default BlockchainData;
