import { reducer } from './Reducer'
import { createStore } from 'redux'

const Store= createStore(reducer)

export default Store;