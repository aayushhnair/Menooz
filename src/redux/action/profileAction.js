import {CHANGE_LANGUAGE} from '../types';

export const changeLanguageAction = type => {
  return dispatch => {
    dispatch({
      type: CHANGE_LANGUAGE,
      payload: type,
    });
  };
};
