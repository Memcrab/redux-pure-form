# redux-pure-form  [![npm package](https://img.shields.io/npm/v/redux-pure-form.svg?style=flat-square)](https://www.npmjs.org/package/redux-pure-form) [![Dependency Status](https://david-dm.org/max-mykhailenko/redux-pure-form.svg)](https://david-dm.org/max-mykhailenko/redux-pure-form)

Redux actions for good performance and hight integration with your reducers
- Very small (less than 4Kb)
- Without dependencies
- Use your current react-redux `connect`
- Don't create react-redux connection for each field
- Can by highly customizable

## Installation
`npm i -S redux-pure-form`

## Usage
```jsx
import { formActions, mergeActionsToProps, formReducer } from '../dist/redux-pure-form.min.js';

class Example extends Component {
  render() {
    return (
      <form>
        <input
          type="text"
          // add field name attr
          name="user.name"
          // add field value attr
          value={this.props.user.name}
          // add handlers from form
          {...this.props.fieldAttrs}
        />
      </form>
    );
  }
}

// ...

function firstReducer(state = {}, action) {
  switch (action.type) {
    default:
      // add form reducer as default reducer
      return formReducer('formName', state, action);
  }
}

// ...

// add mergeActionsToProps as third argument
const Connected = connect(mapStateToProps, formActions, mergeActionsToProps)(Example);

```

## No Additional Settings Yet

## Changelog (latest on top)
   - first release

## Developing
   - `npm install`
   - `npm run webpack:dev -- --watch`
   - `npm run webpack:prod -- --watch`
   - Open `index.html` and `example.js` from examples
