
import React from 'react'
import Nav2 from '../navs/Nav2'
import Nav1 from '../navs/Nav1'
import './timer.css'

class Clock extends React.Component {
    format(time) {
      let seconds = time % 60;
      let minutes = Math.floor(time / 60);
      minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
      seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
      return minutes + ':' + seconds;
    }
    render () {
      const {time} = this.props;
      return (
        <div className="displayedTime">
          <h1>{this.format(time)}</h1>
        </div>
      )
    }
  }
  
  class Input extends React.Component {
    
    onSubmit(event) {
      event.preventDefault();
      const strSeconds = (parseInt(this.refs.seconds.value) * 60).toString();
      if(strSeconds.match(/[0-9]/)) {
        this.refs.seconds.value = '';
        this.props.onSetCountdown(parseInt(strSeconds, 10));
      }
    }
    
    render() {
      return (
        <form ref="form" onSubmit={this.onSubmit.bind(this)}>
          <input className="inputTimer" type="text" ref="seconds" placeholder="enter time in minutes" defaultValue={5}/>
          {/* <br /> */}
          <button className="btn btn-success" type="submit">Start</button>
        </form>
      )
    }
  }
  
  class Button extends React.Component {
    render() {
      return (
          <button className="btn btn-warning" onClick={this.props.onClickHandler}>{this.props.label}</button>    
      );
    }
  }


class Timer extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            count: 300,
            running: false,
          }
        }
        
        componentDidUpdate(prevProps, prevState) {
          if(this.state.running !== prevState.running){
            switch(this.state.running) {
              case true:
                this.handleStart();
            }
          }
        }
        
        handleStart() {
          this.timer = setInterval(() => {
            const newCount = this.state.count - 1;
            this.setState(
              {count: newCount >= 0 ? newCount : 0}
            );
          }, 1000);
        }
        
        handleReset() {
          this.setState(
            {count: 0}
          );
        }
        
        handleCountdown(seconds) {
          this.setState({
            count: seconds,
            running: true
          })
        }

    render(){
        const {count} = this.state;
        return (
            <div className="timer">
                {localStorage.getItem('username')!=null?<Nav2/>:<Nav1/>} 
                <Clock time={count}/>
                <span className="clock">
                <Input onSetCountdown={this.handleCountdown.bind(this)}/>
                <Button label="reset" onClickHandler={this.handleReset.bind(this)}/> 
                </span>
                <div className="clock"><img src="https://media.giphy.com/media/qESFbPpn6qPNo5yCQs/giphy.gif" alf="not found" className="sad1"></img>
                </div>
        
{/*         
                <img src="https://media.giphy.com/media/qESFbPpn6qPNo5yCQs/giphy.gif" alf="not found" className="sad"></img><br/><br/> */}
            </div>
        )
    }
}

export default Timer

