export default class Store {
  constructor(initialState = {}) {
    this.state = initialState;
    this.setState = this.setState.bind(this);
    this.subscribers = [];
  }

  setState(partialState) {
    Object.assign(this.state, partialState);
    this.subscribers.forEach(component => component.setState(partialState));
  }
}
