import AppNavigation from '../navigations'

const navReducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  console.log(state)
  return newState || state
  //return null
};

export default navReducer;
