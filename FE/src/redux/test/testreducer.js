
import { TEST } from "./actions";

const initialState = {
    input:""
};

const testReducer = (state = initialState, action) => {
    switch(action.type){
        case TEST:{
            return { ...state, input:action.payload };
        }
        default:{
            return state;
        }
    }
}

export default testReducer;