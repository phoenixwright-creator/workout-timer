'use strict'

class WorkoutTimer extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }

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
    }

    breakIncrement(){
        // increment break length by 1 and display the value in the break div
        // break length must be <= 60
    }

    sessionDecrement(){
        // decrement session length by 1 and display the value in the session div
        // session length must be > 0 
    }

    sessionIncrement(){
        // increment session length by 1 and display the value in the session div
        // session length must be <= 60
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
                    <div id="break-length">Break Length</div>
                </div>
                <div id="session-div">
                    <h2 id="session-label">Session Duration</h2>
                    <button id="session-decrement" onClick={this.sessionDecrement}>Session Decrement</button>
                    <button id="session-increment" onClick={this.sessionIncrement}>Session Increment</button>
                    <div id="break-length">Session Length</div>
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

ReactDOM.render(<WorkoutTimer />, document.getElementById("main-container"));
