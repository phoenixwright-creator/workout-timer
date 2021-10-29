
const defaultState = {
    breakLength: 5,
    sessionLength: 25,
    breakTime: 5,
    sessionTime: 25,
    display: 'session',
    running: ''
};
const BREAKINCREMENT = 'BREAKINCREMENT';
const BREAKDECREMENT = 'BREAKDECREMENT';
const SESSIONINCREMENT = 'SESSIONINCREMENT';
const SESSIONDECREMENT = 'SESSIONDECREMENT';
const STARTSTOP = 'STARTSTOP';
const RESET = 'RESET';
const reducer = (state = defaultState, action) => {
    const newState = Object.assign({}, state);
    switch(action.type){
        case BREAKINCREMENT:
            if(newState.breakLength < 60){
                newState.breakLength++;
                return newState;
            }
            else{
                return state;
            }
        case BREAKDECREMENT:
            if(newState.breakLength > 1){
                newState.breakLength--;
                return newState;
            }
            else{
                return state;
            }
        case SESSIONINCREMENT:
            if(newState.sessionLength < 60){
                newState.sessionLength++;
                return newState;
            }
            else{
                return state;
            }
        case SESSIONDECREMENT:
            if(newState.sessionLength > 1){
                newState.sessionLength--;
                return newState;
            }
            else{
                return state;
            }
        case STARTSTOP:
            if(newState.sessionTime > 0){
                newState.running = 'start';
                newState.sessionTime--;
                return newState;
            }
            else{
                clearInterval(timer);
            }
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
let timer = setInterval(() => {
    store.dispatch({
        type: STARTSTOP
    });
    render();
}, 1000);
function startStop(){
    timer;
};

function reset(){
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
    time.innerHTML = state.sessionTime + ":00";
}

render();