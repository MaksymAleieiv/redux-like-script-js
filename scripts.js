const id = (id) => {
    return document.getElementById(id)
}

store1.subscribe(store => store.textReducer, (text) => {
    id('inpText').textContent = text.current.text
})

store1.subscribe(store => store.userReducer, (user) => {
    console.log(user.current.userInfo)
})

const inputHandler = (text) => {
    setText(text)
}

store2.subscribe(store => store.textReducer, (text) => {
    id('inp2').value = text.current.text
    id('inpText2').textContent = text.current.text
})

const inputHandler2 = (text) => {
    setText2(text)
}

fetchUser(1)