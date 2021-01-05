import { HOME_INIT_FETCHED } from "./actionTypes";

const initialState = {
    initResponse:null
};

export const homeReducer = (state = initialState, action) => {
    switch(action.type){
        case HOME_INIT_FETCHED:{
            return { ...state, initResponse:action.payload.initResponse };
        }
        default:{
            return state
        }
    }
}