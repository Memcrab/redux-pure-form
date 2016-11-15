import React, { Component, PropTypes } from 'react';
import { createStore, combineReducers } from 'redux';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { formActions, mergeActionsToProps, formReducer } from '../dist/redux-pure-form.min.js';

class Example extends Component {
  static propTypes = {
    user: PropTypes.object,
    fieldAttrs: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.handle = this.handle.bind(this);
  }

  handle(e) {
    this.props.fieldAttrs.onChange(e);
  }

  render() {
    console.log('fieldAttrs =>', this.props.fieldAttrs, this.props.user);
    return (
      <form>
        <input
          type="text"
          name="user.name"
          value={this.props.user.name}
          {...this.props.fieldAttrs}
        />
        <input
          type="text"
          name="user.surname"
          value={this.props.user.surname}
          {...this.props.fieldAttrs}
          onChange={this.handle}
        />
        <input
          type="text"
          name="user.surnameduplicate"
          value={this.props.user.surnameduplicate || ''}
          {...this.props.fieldAttrs}
        />
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.exampleReducer.user,
  };
}

function exampleReducer(state = {}, action) {
  switch (action.type) {
    default:
      return formReducer(state, action);
  }
}

/* eslint-disable no-underscore-dangle */
const store = createStore(
  combineReducers({ exampleReducer }),
  { exampleReducer: { user: { name: '12', surname: '123' } } },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

const Connected = connect(mapStateToProps, formActions, mergeActionsToProps)(Example);

render((
  <Provider store={store}>
    <Connected />
  </Provider>
), document.getElementById('js--content'));
