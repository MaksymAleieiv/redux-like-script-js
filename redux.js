const createStore = () => {
    return {
        select: (func) => func(store.values),
        dispatch: (action) => {
            for (const [key, value] of Object.entries(store.reducers)){
                let result = value(store.values[key], action)
                try {
                    result.then()
                }catch {
                    if(store.values[key] !== result) {
                        store.values[key] = {
                            '_old': store.values[key].current,
                            ...result
                        };
                    };
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
                        ...value()
                    }
                };
                reducers = {
                    ...reducers,
                    [key]: value
                };
            };
            store.values = values;
            store.reducers = reducers;
        },
        reducers: {},
        values: {}
    }
}