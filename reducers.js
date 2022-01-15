const initialValueText = {
    text: ''
}

const textReducer = (state = initialValueText, action) => {
    switch(action?.type) {
        case 'setText': return {
            text: action.payload
        }
        default: return state
    }
}

const initialValueUser = {
    userInfo: null
}

const userReducer = (state = initialValueUser, action) => {
    switch(action?.type) {
        case 'setUser': return {
            userInfo: action.payload
        }
        case 'fetchUser': return fetch(`https://jsonplaceholder.typicode.com/users/${action.payload}`)
        .then(res => res.json())
        .then(res => setUser(res))
        default: return state
    }
}

const setText = (payload) => store1.dispatch({type: 'setText', payload})

const fetchUser = (payload) => store1.dispatch({type: 'fetchUser', payload})
const setUser = (payload) => store1.dispatch({type: 'setUser', payload})

const store1 = createStore()

store1.initStore({
    textReducer,
    userReducer
})








const initialValueText2 = {
    text: 'this text is from second store'
}

const textReducer2 = (state = initialValueText2, action) => {
    switch(action?.type) {
        case 'setText2': return {
            text: action.payload
        }
        default: return state
    }
}

const setText2 = (payload) => store2.dispatch({type: 'setText2', payload})


const store2 = createStore()

store2.initStore({
    textReducer: textReducer2
})