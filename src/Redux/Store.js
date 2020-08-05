// import { Reducer } from './Reducer'
// import { createStore } from 'redux'

// const Store= createStore(Reducer)
// export default Store;

import { reducer } from './Reducer'
import { createStore } from 'redux'

const Store= createStore(reducer)

export default Store;