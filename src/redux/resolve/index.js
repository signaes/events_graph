const resolve = ({ reducers, state, action }) => {
  const reducer = reducers[action.type];

  console.log(reducers, action, reducer)

  return typeof reducer === 'function' ? reducer() : state;
};

export default resolve;
