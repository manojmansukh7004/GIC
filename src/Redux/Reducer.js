import { SET_BASEURL, SET_USER} from './ActionType'

const initialState ={
    user: '',
    baseUrl: '',
    primaryColor: "#297AF9",
    secColor:"#F2F7F4"
}

export const reducer = (state = initialState, action) => {
    console.log("mjjjjj",state,action)

    switch(action.type){
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
            
            case SET_BASEURL:
                return {
                    ...state,
                    baseUrl: action.payload
                };
    }
}