const defaultState = {
    breakLength: 5,
    sessionLength: 25,
    breakTime: 5,
    sessionTime: 25,
    display: 'session',
    reset: true
}
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
            newState.reset = false;
            newState.sessionTime--;
            return newState;
        case STARTBREAK:
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
    let newState = store.getState();
    newState.reset = false;
    newState.breakTime = newState.breakLength + 1;
    let timer = setInterval(() => {
            if(newState.reset === true){
                clearInterval(timer);
            }
            else if(newState.display === 'session'){
                store.dispatch({
                    type: STARTSESSION
                });
                render();
                newState = store.getState();
                if(newState.sessionTime === 0){
                newState.display = 'break';
                newState.sessionTime = newState.sessionLength + 1;
                }
            }
            else if(newState.display === 'break'){
                store.dispatch({
                    type: STARTBREAK
                });
                render();
                newState = store.getState();
                if(newState.breakTime === 0){
                    newState.display = 'session';
                    newState.breakTime = newState.breakLength + 1;
                }
            }
    }, 1000);
}
function reset(){
    let newState = store.getState();
    newState.reset = true;
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
    const timerLabel = document.getElementById("timer-label");
    const time = document.getElementById("time-left");
    if(state.display === 'session'){
        timerLabel.innerHTML = 'Session';
        time.innerHTML = state.sessionTime + ":00";
    }
    else if(state.display === 'break'){
        timerLabel.innerHTML = 'Break';
        time.innerHTML = state.breakTime + ":00";
    }
}
render();