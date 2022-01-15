const createStore = () => {

    let sendUpdatesToSubscribers = (initalLoad = false) => {
        storeMarkup.subscriberCallbacks.forEach(subscriberCallback => {
            let currentValue = storeMarkup.getState(subscriberCallback.path);
            let oldValue = subscriberCallback.value;
            if(currentValue !== oldValue || initalLoad){
                subscriberCallback.value = currentValue;
                subscriberCallback.callback(currentValue);
            }
        })
    }

    const storeMarkup = {
        getState: (path) => path(storeMarkup.values),
        subscribe: (path, callback) => {
            storeMarkup.subscriberCallbacks.push({path, callback, value: storeMarkup.getState(path)})
            sendUpdatesToSubscribers(true)
        },
        dispatch: (action) => {
            for (const [key, value] of Object.entries(storeMarkup.reducers)){
                let result = value(storeMarkup.values[key].current, action)
                try {
                    result.then()
                }catch {
                    if(storeMarkup.values[key].current !== result) {
                        storeMarkup.values[key] = {
                            _old: storeMarkup.values[key].current,
                            current: result
                        }
                        sendUpdatesToSubscribers()
                    }
                }
            }
        },
        initStore: (combinedReducers) => {
            let values = {}, reducers = {};
            for (const [key, value] of Object.entries(combinedReducers)) {
                values = {
                    ...values,
                    [key]: {
                        '_old': {},
                        'current': value()
                    }
                };
                reducers = {
                    ...reducers,
                    [key]: value
                };
            };
            storeMarkup.values = values;
            storeMarkup.reducers = reducers;
        },
        subscriberCallbacks: [],
        reducers: {},
        values: {}
    }

    return storeMarkup
    
}