import usersAPI from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";
import {UserType} from '../types/types';

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOOGLE_IS_FETCHING = "TOOGLE_IS_FETCHING";
const TOOGLE_IS_FOLLOWING_PROGRESS = "TOOGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
  users: [ ] as Array<UserType>,
  pageSize: 15,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>,
};

type InitialState = typeof initialState;

export const usersReducer = (state = initialState, action: any):InitialState  => {
  switch (action.type) {
    case FOLLOW:{
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed:true})
      }
    }
    case UNFOLLOW:{
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed:false})
      }
    }
    case SET_USERS:{
      return { ...state, users: action.users }
    }
    case SET_CURRENT_PAGE:{
      return { ...state, currentPage: action.currentPage }
    }
    case SET_TOTAL_USERS_COUNT:{
      return { ...state, totalUsersCount: action.count }
    }
    case TOOGLE_IS_FETCHING:{
      return { ...state, isFetching: action.isFetching }
    }
    case TOOGLE_IS_FOLLOWING_PROGRESS:{
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id: number) => id !== action.userId),
      }
    }
    default:
      return state;
  }
};


type FollowSuccessActionType = {
  type: typeof FOLLOW
  userId: number
}
export const followSuccess = (userId: number):FollowSuccessActionType => {
  return {
    type: FOLLOW,
    userId: userId,
  };
};


type UnfollowSuccessActionType = {
  type: typeof UNFOLLOW
  userId: number
}
export const unfollowSuccess = (userId: number):UnfollowSuccessActionType => {
  return {
    type: UNFOLLOW,
    userId: userId,
  };
};


type SetUsersActionType = {
  type: typeof SET_USERS
  users: Array<UserType>
}
export const setUsers = (users: Array<UserType>):SetUsersActionType => {
  return {
    type: SET_USERS,
    users: users,
  };
};


type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
export const setCurrentPage = (currentPage: number):SetCurrentPageActionType => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage: currentPage,
  };
};


type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT
  count: number
}
export const setTotalUsersCount = (totalUsersCount: number):SetTotalUsersCountActionType => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount,
  };
};


type ToggleIsFetchingActionType = {
  type: typeof TOOGLE_IS_FETCHING
  isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean):ToggleIsFetchingActionType => {
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

export const requestUsers = (currentPage: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPage));

        let data = await usersAPI.requestUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    };
};

const followUnfollowFlow = async (dispatch: any, userId:number, apiMethod:any, actionCreator:any) => {
  dispatch(toggleFollowingProgress(true, userId))
  let response = await apiMethod(userId)
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId:number) => {
    return async(dispatch: any) => {
      followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    };
};

export const unfollow = (userId:number) => {
    return async (dispatch: any) => {
      followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    };
};
