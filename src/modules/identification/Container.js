import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SafetyCode from './SafetyCode/SafetyCode';
import Permissions from './Permissions/Permissions';
import { 
  changeStatus, 
  formChange, 
  requestPermission, 
  sendCode 
} from './actions';

const mapStateToProps = state => {
  const {
    identification: {
      code,
      isRequesting,
      permissions,
      status,
    },
  } = state;

  return {
    code,
    isRequesting,
    permissions,
    status,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeStatus: status => { dispatch(changeStatus(status)); },
    formChange: change => { dispatch(formChange(change)); },
    requestPermission: permission => { dispatch(requestPermission(permission)); },
    sendCode: code => { dispatch(sendCode(code)); },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Identification extends PureComponent {
  static propTypes = {
    code: PropTypes.string,
    changeStatus: PropTypes.func,
    formChange: PropTypes.func,
    isRequesting: PropTypes.bool,
    permissions: PropTypes.object,
    requestPermission: PropTypes.func,
    isSendingResponse: PropTypes.bool,
    status: PropTypes.string,
    sendCode: PropTypes.func,
  };

  onFormChange = async field => {
    const {
      formChange,
      changeStatus,
      status,
      sendCode,
    } = this.props;

    await formChange(field);

    if (field.value.length === 6) {
      changeStatus('SENDING');
      sendCode(field.value);
    }
  
    if (field.value.length !== 6 && status === 'SENDING')
      changeStatus(undefined);
    };
  
  onRequestPermission = async permission => {
    const {
      changeStatus,
      requestPermission,
      status,
    } = this.props;
    
    if (status === 'IDLE') {
      changeStatus('REQUESTING');
    }

    requestPermission(permission);
  };

  render() {
    const {
      code,
      permissions,
      isRequesting,
      isSendingResponse,
      status,
    } = this.props;

    return (
      <div>
        <SafetyCode
          code={code}
          formChange={this.onFormChange}
          status={status}
        />
        <Permissions
          code={code}
          permissions={permissions}
          onRequestPermission={this.onRequestPermission}
          isSendingResponse={isSendingResponse}
          status={status}
        />
      </div>
    );
  }
}
