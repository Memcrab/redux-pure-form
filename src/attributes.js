import * as formActions from './actions.js';

const defaultAttrs = ['onChange'];
const attrsActionsRels = {
  onChange: 'onChange'
};

export default function mapActionsToAttrs(actions, attrs = defaultAttrs) {
  return attrs.reduce((acc, attr) => {
    return {
      ...acc,
      [attr]: actions[attrsActionsRels[attr]],
    };
  }, {});
}

function mergeActionsToProps(stateProps, dispatchProps, ownProps) {
  return Object.assign(
    {},
    ownProps,
    stateProps,
    dispatchProps,
    {
      fieldAttrs: mapActionsToAttrs(dispatchProps),
    },
  );
}


export default mergeActionsToProps;
