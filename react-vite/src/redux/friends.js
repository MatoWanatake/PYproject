import { SET_FRIENDS } from '../components/Friends/Friends'

export const setFriends = (friends) => ({
    type: SET_FRIENDS,
    friends
})

// Thunk to fetch friends from backend
export const fetchFriends = () => async (dispatch) => {
  const res = await fetch('/api/friends')
  if (res.ok) {
    const data = await res.json();
    dispatch(setFriends(data.friends))
  } else {
    console.error('Failed to fetch friends')
  }
};

// Initial state and reducer
const initialState = [];

export default function friendsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FRIENDS:
      return action.friends;
    default:
      return state;
  }
}
