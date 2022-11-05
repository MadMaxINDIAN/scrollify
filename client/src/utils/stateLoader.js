class StateLoader {

    loadState() {
        try {
            const serializedState = localStorage.getItem("scrollify");


            if (serializedState === null) {
                return this.initializeState();
            }
            const data = JSON.parse(serializedState);
            data.errors = {};

            // uncomment below line to remove persist login feature
            // data.auth = {};

            // uncomment below line to save loader changes in local storage
            // data.loading.isLoading = false;
            return data;
        }
        catch (err) {
            return this.initializeState();
        }
    }

    saveState(state) {
        try {
            const saveState = state;
            saveState.errors = {};
            // saveState.loading.isLoading = false;
            const serializedState = JSON.stringify(saveState);
            localStorage.setItem("scrollify", serializedState);
            this.state = serializedState;
        }
        catch (err) {
            console.log(err);
        }
    }

    initializeState() {
        return {};
    };
}


export default StateLoader;