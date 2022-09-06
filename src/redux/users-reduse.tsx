import usersAPI from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOOGLE_IS_FETCHING = "TOOGLE_IS_FETCHING";
const TOOGLE_IS_FOLLOWING_PROGRESS = "TOOGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
  users: [],
  pageSize: 20,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: false,
};

export const usersReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u: any) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u: any) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    case SET_USERS:
      return { ...state, users: action.users };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.count };
    case TOOGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case TOOGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id: number) => id != action.userId),
      };
    default:
      return state;
  }
};

export const followSuccess = (userId: any) => {
  return {
    type: FOLLOW,
    userId: userId,
  };
};
export const unfollowSuccess = (userId: any) => {
  return {
    type: UNFOLLOW,
    userId: userId,
  };
};
export const setUsers = (users: any) => {
  return {
    type: SET_USERS,
    users: users,
  };
};
export const setCurrentPage = (currentPage: any) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage: currentPage,
  };
};
export const setTotalUsersCount = (totalUsersCount: any) => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount,
  };
};
export const toggleIsFetching = (isFetching: any) => {
  return {
    type: TOOGLE_IS_FETCHING,
    isFetching: isFetching,
  };
};
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => {
  return {
    type: TOOGLE_IS_FOLLOWING_PROGRESS,
    isFetching: isFetching,
    userId: userId,
  };
};

export const getUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: any) => {
        dispatch(toggleIsFetching(true));

        usersAPI.getUsers(currentPage, pageSize).then((data: any) => {
          dispatch(toggleIsFetching(false));
          dispatch(setUsers(data.items));
          dispatch(setTotalUsersCount(data.totalCount));
        });
    };
};

export const follow = (userId:number) => {
    return (dispatch: any) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.follow(userId)
          .then((response:any) => {
            if (response.data.resultCode == 0) {
                dispatch(followSuccess(userId));
            }
            dispatch(toggleFollowingProgress(false, userId));
        });
    };
};

export const unfollow = (userId:number) => {
    return (dispatch: any) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.unfollow(userId).then((response:any) => {
            if (response.data.resultCode == 0) {
                dispatch(unfollowSuccess(userId));
            }
            dispatch(toggleFollowingProgress(false, userId));
        });
    };
};
