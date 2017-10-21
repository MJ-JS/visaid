import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputText from '../../components/InputText';
import { formChange, onSubmit } from './actions';
import Button from '../../components/Button';

const mapStateToProps = state => {
  return {
    message: state.login.message,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    formChange: (change) => { dispatch(formChange(change)); },
    onSubmit: () => { dispatch(onSubmit()); },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends PureComponent {
  onFormChange = field => {
    this.props.formChange(field);
  }

  onSubmit = submit => {
    this.props.onSubmit(submit);
  }

  render() {
    return (
      <div>
        <InputText
          className="test"
          disabled={false}
          value={undefined}
          placeholder="Username/Email"
          name="username"
          onChange={this.onFormChange}
        />
        <br />
        <InputText
          className="test"
          disabled={false}
          value={undefined}
          placeholder="Password"
          name="password"
          onChange={this.onFormChange}
        />
        <br />
        <Button
          text="button"
          onClick={this.onSubmit}
        />
      </div>
    );
  }
}
