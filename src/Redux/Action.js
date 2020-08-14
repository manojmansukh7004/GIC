import { SET_USER, SET_BASEURL} from './ActionType'
import {  SET_TS_ID } from './ActionType'

export function setUser(data){
    return{
        type: SET_USER,
        payload: data
    }
}

export function setBaseUrl(data){
    return{
        type: SET_BASEURL,
        payload: data
    }
}

export function setTsId(data){
    return{
        type: SET_TS_ID,
        payload: data
    }
}