import {CHANGE_LANGUAGE} from '../types';

const INITIAL_STATE = {
  language: 'English(US)',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
}
