import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Observable from 'react-overwatch'
import './styles.css'

const arr = [1, 2, 3]

const randomizeColor = () => {
  return Math.floor(Math.random() * 256)
}
const makeColor = () => {
  return `rgb(${randomizeColor()}, ${randomizeColor()}, ${randomizeColor()})`
}

class InfiniteScroll extends Component {
  state = {
    arr: arr,
  }
  addItems = (amount) => {
    const { arr } = this.state
    const newArr = Array.from(
      { length: amount },
      (_, index) => arr[arr.length - 1] + 1 + index,
    )
    const arrCopy = [...arr, ...newArr]
    return arrCopy
  }

  onEnter = () => {
    this.setState({ arr: this.addItems(5) })
  }
  render() {
    return (
      <div>
        {this.state.arr.map((i) => (
          <div
            className="baseBlock"
            data-key={i}
            style={{ background: makeColor() }}
          >
            {i}
          </div>
        ))}
        <Observable onEnter={this.onEnter}>
          <div className="watcher" />
        </Observable>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<InfiniteScroll />, rootElement)
