
const defaultState = {
    breakLength: 5,
    sessionLength: 5,
    breakTime: 5,
    sessionTime: 5,
    display: 'session',
    running: ''
};

const BREAKINCREMENT = 'BREAKINCREMENT';
const BREAKDECREMENT = 'BREAKDECREMENT';
const SESSIONINCREMENT = 'SESSIONINCREMENT';
const SESSIONDECREMENT = 'SESSIONDECREMENT';
const STARTSESSION = 'STARTSESSION';
const STARTBREAK = 'STARTBREAK';
const STOP = 'STOP';
const RESET = 'RESET';

const reducer = (state = defaultState, action) => {
    const newState = Object.assign({}, state);
    switch(action.type){
        case BREAKINCREMENT:
            if(newState.breakLength < 60){
                newState.breakLength++;
                newState.breakTime = newState.breakLength;
                return newState;
            }
            else{
                return state;
            }
        case BREAKDECREMENT:
            if(newState.breakLength > 1){
                newState.breakLength--;
                newState.breakTime = newState.breakLength;
                return newState;
            }
            else{
                return state;
            }
        case SESSIONINCREMENT:
            if(newState.sessionLength < 60){
                newState.sessionLength++;
                newState.sessionTime = newState.sessionLength;
                return newState;
            }
            else{
                return state;
            }
        case SESSIONDECREMENT:
            if(newState.sessionLength > 1){
                newState.sessionLength--;
                newState.sessionTime = newState.sessionLength;
                return newState;
            }
            else{
                return state;
            }
        case STARTSESSION:
            newState.running = 'on';
            newState.sessionTime--;
            return newState;
        case STARTBREAK:
            newState.display = 'break';
            newState.breakTime--;
            return newState;
        case RESET:
            return defaultState;
        default:
            return state;
    }
};

const store = Redux.createStore(reducer);

Window.store = store;

function breakDecrement(){
    store.dispatch({
        type: BREAKDECREMENT
    });
    render();
}

function breakIncrement(){
    store.dispatch({
        type: BREAKINCREMENT
    });
    render();
}

function sessionDecrement(){
    store.dispatch({
        type: SESSIONDECREMENT
    });
    render();
}

function sessionIncrement(){
    store.dispatch({
        type: SESSIONINCREMENT
    });
    render();
}

function startStop(){
    let newState;
    let timer = setInterval(() => {
            store.dispatch({
                type: STARTSESSION
            });
            render();
            let newState = store.getState();
            if(newState.sessionTime === 0){
                clearInterval(timer);
                console.log(store.getState());
                timer = setInterval(() => {
                    store.dispatch({
                        type: STARTBREAK
                    });
                    render();
                    newState = store.getState();
                    if(newState.breakTime === 0){
                        clearInterval(timer);
                        console.log(store.getState());
                    }
                }, 1000);
            }
    }, 1000);
    
}

function reset(){
    location.reload();
    store.dispatch({
        type: RESET
    });
    render();
}

function render(){
    const state = store.getState();
    const breakLength = document.getElementById("break-length");
    breakLength.innerHTML = state.breakLength;
    const sessionLength = document.getElementById("session-length");
    sessionLength.innerHTML = state.sessionLength;
    const time = document.getElementById("time-left");
    if(state.display === 'session'){
        time.innerHTML = state.sessionTime + ":00";
    }
    else if(state.display === 'break'){
        time.innerHTML = state.breakTime + ":00";
    }
    
}

render();

