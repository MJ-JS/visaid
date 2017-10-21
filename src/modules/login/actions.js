export const formChange = ({ name, value }) => dispatch => {
  dispatch({
    type: 'FORM_CHANGE',
    name,
    value,
  });
};

export const onSubmit = () => dispatch => {
  dispatch({
    type: 'ON_SUBMIT',
  });
};
