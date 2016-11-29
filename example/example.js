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
    this.setDefaults = this.setDefaults.bind(this);
  }

  handle(e) {
    this.props.fieldAttrs.onChange({
      [e.target.name]: e.target.value,
      'user.surnameduplicate': {
        value: e.target.value,
        parser: value => `${value.toUpperCase().replace(/ /g, '')}!`,
      },
    });
  }

  setDefaults() {
    this.props.fieldAttrs.onChange({
      user: { name: 'superman' },
    });
  }

  render() {
    console.log('user =>', this.props);
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
        <br />
        <br />
        <select value={this.props.user.gender} name="user.gender" {...this.props.fieldAttrs}>
          <option value="1">male</option>
          <option value="2">female</option>
        </select>
        <br />
        <br />
        <select
          value={this.props.user.resources}
          name="user.resources"
          multiple="multiple"
          size="2"
          {...this.props.fieldAttrs}
        >
          <option value="1">res 1</option>
          <option value="2">res 2</option>
        </select>
        <br />
        <br />
        <button type="button" onClick={this.setDefaults}>set default values</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.firstReducer.user,
    profile: state.secondReducer.user,
  };
}

function firstReducer(state = {}, action) {
  switch (action.type) {
    default:
      return formReducer('user')(state, action);
  }
}

function secondReducer(state = {}, action) {
  switch (action.type) {
    default:
      return formReducer('profile')(state, action);
  }
}

/* eslint-disable no-underscore-dangle */
const store = createStore(
  combineReducers({ firstReducer, secondReducer }),
  { firstReducer: { user: { name: '12', surname: '123' } } },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

const Connected = connect(mapStateToProps, formActions, mergeActionsToProps)(Example);

render((
  <Provider store={store}>
    <Connected />
  </Provider>
), document.getElementById('js--content'));
