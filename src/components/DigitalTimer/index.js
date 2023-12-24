import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimeRunning: false,
    timeLimit: 25,
    timeElapsedInSeconds: 0,
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  getEclapsedTimeInSeconds = () => {
    const {timeLimit, timeElapsedInSeconds} = this.state
    const remainingTime = timeLimit * 60 - timeElapsedInSeconds

    const minutes = Math.floor(remainingTime / 60)
    const seconds = Math.floor(remainingTime % 60)
    const stringefiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringefiedMinutes}:${stringifiedSeconds}`
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeLimit, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeLimit * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({timeElapsedInSeconds: 0})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  startAndPauseButton = () => {
    const {isTimeRunning, timeLimit, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeLimit * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimeRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({
      isTimeRunning: !prevState.isTimeRunning,
    }))
  }

  resetButton = () => {
    this.clearTimerInterval()
    this.setState({
      timeLimit: 25,
      timeElapsedInSeconds: 0,
      isTimeRunning: false,
    })
  }

  renderTimeControl = () => {
    const {isTimeRunning} = this.state
    const imgUrl = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const imgAlt = isTimeRunning ? 'pause icon' : 'play icon'
    const label = isTimeRunning ? 'Pause' : 'Start'

    return (
      <div className="start-reset-container">
        <button
          type="button"
          onClick={this.startAndPauseButton}
          className="button"
        >
          <img src={imgUrl} alt={imgAlt} className="image" />
          <p className="start-and-pause-button-text"> {label}</p>
        </button>
        <button type="button" onClick={this.resetButton} className="button">
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="image"
          />
          <p className="start-and-pause-button-text"> Reset </p>
        </button>
      </div>
    )
  }

  onIncremnet = () => {
    this.setState(prevState => ({timeLimit: prevState.timeLimit + 1}))
  }

  onDecrement = () => {
    this.setState(prevState => ({timeLimit: prevState.timeLimit - 1}))
  }

  renderSetLimitTime = () => {
    const {timeLimit, timeElapsedInSeconds} = this.state
    const disabled = timeElapsedInSeconds > 0

    return (
      <div className="set-timelimit-container">
        <p className="para"> Set Timer limit </p>
        <div className="set-timelimit-inner-container">
          <button
            className="set-timelimit-button"
            disabled={disabled}
            type="button"
            onClick={this.onDecrement}
          >
            -
          </button>
          <p className="timeLimitPara"> {timeLimit} </p>
          <button
            className="set-timelimit-button"
            disabled={disabled}
            type="button"
            onClick={this.onIncremnet}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {isTimeRunning} = this.state
    const time = this.getEclapsedTimeInSeconds()
    const labelText = isTimeRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading"> Digital Timer </h1>
        <div className="flex-resizer">
          <div className="timer-container">
            <div className="elapsed-time-container">
              <h1 className="countdown">{time}</h1>
              <p className="timer-status">{labelText}</p>
            </div>
          </div>
          <div className="controlling-container">
            {this.renderTimeControl()}
            {this.renderSetLimitTime()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
