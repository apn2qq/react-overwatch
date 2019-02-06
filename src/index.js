import React, { PureComponent } from 'react'
class Observable extends PureComponent {
  static defaultProps = {
    isObservable: true,
    onLeave: () => null,
    onEnter: () => null,
    onIntersection: () => null,
  }

  observer = null

  componentDidMount() {
    const { options, isObservable } = this.props
    this.observer = new IntersectionObserver(this.handleObserverUpdate, options)

    if (isObservable) {
      this.launchObserving()
    }
  }

  launchObserving() {
    this.observer.observe(this.observableNode)
  }

  getRef = (observableNode) => {
    this.observableNode = observableNode
  }

  handleObserverUpdate = (entries) => {
    const { onIntersection, onEnter, onLeave } = this.props
    const { intersectionRect } = entries[0]
    const { top, left, bottom, right } = intersectionRect

    if ([top, bottom, left, right].some((prop) => prop) && onEnter) {
      onEnter(entries)
    } else if (onLeave) {
      onLeave(entries)
    }
    onIntersection(entries)
  }

  disruptObserving() {
    this.observer.unobserve(this.observableNode)
  }

  componentDidUpdate(prevProps) {
    const { isObservable } = this.props
    if (isObservable && !prevProps.isObservable) {
      this.launchObserving()
    }

    if (!isObservable && prevProps.isObservable) {
      this.disruptObserving()
    }
  }

  componentWillUnmount() {
    this.observer.disconnect()
  }

  render() {
    const { className, children } = this.props
    return (
      <div className={className} ref={this.getRef}>
        {children}
      </div>
    )
  }
}

export default Observable
