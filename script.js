

import Provider from 'react-redux';

const defaultState = {
    breakLength: 5,
    sessionLength: 25,
    display: 'session',
    running: 'off'
};
const BREAKINCREMENT = 'BREAKINCREMENT';
const BREAKDECREMENT = 'BREAKDECREMENT';
const SESSIONINCREMENT = 'SESSIONINCREMENT';
const SESSIONDECREMENT = 'SESSIONDECREMENT';
const breakIncrement = {
    type: BREAKINCREMENT
};
const breakDecrement = {
    type: BREAKDECREMENT
};
const sessionIncrement = {
    type: SESSIONINCREMENT
};
const sessionDecrement = {
    type: SESSIONDECREMENT
};
const actionCreator = (action) => {
    return action;
};

const reducer = (state = defaultState, action) => {
    switch(action.type){
        case BREAKINCREMENT:
            return Object.assign({}, state, {breakLength: state.breakLength + 1});
        case BREAKDECREMENT:
            return Object.assign({}, state, {breakLength: state.breakLength - 1});
        case SESSIONINCREMENT:
            return Object.assign({}, state, {sessionLength: state.sessionLength + 1});
        case SESSIONDECREMENT:
            return Object.assign({}, state, {sessionLength: state.sessionLength - 1});
        default:
            return state;
    }
};

const store = Redux.createStore(reducer);

class WorkoutTimer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            breakLength: 5,
            sessionLength: 25,
            display: 'session',
            running: 'off'
        };

        this.breakDecrement = this.breakDecrement.bind(this);
        this.breakIncrement = this.breakIncrement.bind(this);
        this.sessionDecrement = this.sessionDecrement.bind(this);
        this.sessionIncrement = this.sessionIncrement.bind(this);
        this.startStop = this.startStop.bind(this);
        this.reset = this.reset.bind(this);
    }

    breakDecrement(){
        // decrement break length by 1 and display the value in the break div
        // break length must be > 0 
        store.dispatch(actionCreator(breakDecrement));
    }

    breakIncrement(){
        // increment break length by 1 and display the value in the break div
        // break length must be <= 60
        store.dispatch(actionCreator(breakIncrement));
    }

    sessionDecrement(){
        // decrement session length by 1 and display the value in the session div
        // session length must be > 0 
        store.dispatch(actionCreator(sessionDecrement));
    }

    sessionIncrement(){
        // increment session length by 1 and display the value in the session div
        // session length must be <= 60
        store.dispatch(actionCreator(sessionIncrement));
    }

    startStop(){

    }

    reset(){
        // stop timer
        // reset the break length to 5
        // reset the session length to 25
        // reset the time left to default state

    }

    render(){
        return (
            <div>
                <div id="title-div">
                    <h1 id="title">WorkoutTimer App</h1>
                </div>
                <div id="break-div">
                    <h2 id="break-label">Break Duration</h2>
                    <button id="break-decrement" onClick={this.breakDecrement}>Break Decrement</button>
                    <button id="break-increment" onClick={this.breakIncrement}>Break Increment</button>
                    <div id="break-length">BreakLength</div>
                </div>
                <div id="session-div">
                    <h2 id="session-label">Session Duration</h2>
                    <button id="session-decrement" onClick={this.sessionDecrement}>Session Decrement</button>
                    <button id="session-increment" onClick={this.sessionIncrement}>Session Increment</button>
                    <div id="session-length">SessionLength</div>
                </div>
                <div id="workout-div">
                    <h2 id="timer-label">Session/Break</h2>
                    <div id="time-left">Time Running (mm:ss)</div>
                    <button id="start-stop" onClick={this.startStop}>Start/Stop Button</button>
                    <button id="reset" onClick={this.reset}>Reset Button</button>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state){
    return ({
        breakLength: state.breakLength,
        sessionLength: state.sessionLength,
        display: state.display,
        running: state.running
    });
}

function mapDispatchToProps(dispatch){
    return ({
        addBreak: function(breakIncrement){
            dispatch(actionCreator(breakIncrement));
        }
    });
}

const connect = ReactRedux.connect;
const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(WorkoutTimer);

class AppWrapper extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Provider store={store}>
                <ConnectedComponent />
            </Provider>
        );
    }
}

//store.dispatch(actionCreator(breakIncrement));
