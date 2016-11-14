import React, { Component } from 'react';
import { connect, bindActionCreators } from 'redux';
import { mergeActionsToProps } from '../src/attributes.js';
import * as formActions from '../src/actions.js';

class Example extends Component {
  render() {
    return (
      <form>
        <input
          type="text"
          name={`user.name`}
          value={format(this.props.user.name)}
          parser={(enteredValue) => {
            return new Date(enteredValue);
          }}
          {...this.props.fieldAttrs}
        />
        <input
          type="text"
          name={`user.surname`}
          value={format(this.props.user.surname)}
          parser={(enteredValue) => {
            return new Date(enteredValue);
          }}
          {...this.props.fieldAttrs}
        />
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data,
    user: state.user,
    // возможно здесь стоит сделать селектор, пока не знаю зачем
  }
}

export connect(mapStateToProps, formActions, mergeActionsToProps)(Component);