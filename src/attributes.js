// @flow
const defaultAttrs:string[] = ['onChange'];
const attrsActionsRels = {
  onChange: 'onChange',
};

function mapActionsToAttrs(actions: Object, attrs: string[] = defaultAttrs): Object {
  return attrs.reduce((acc: Object, attr: string) => {
    return {
      ...acc,
      [attr]: actions[attrsActionsRels[attr]],
    };
  }, {});
}

function mergeActionsToProps(stateProps: Object, dispatchProps: Object, ownProps: Object): Object {
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
