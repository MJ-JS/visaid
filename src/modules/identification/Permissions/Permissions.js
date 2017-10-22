import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Permission from './Permission';
import ReceivedPermission from './ReceivedPermission';
import Button from '../../../components/Button';

export default class Permissions extends PureComponent {
  static propTypes = {
    enabled: PropTypes.bool,
    permissions: PropTypes.object,
    sentPermissions: PropTypes.object,
    onRequestPermission: PropTypes.func,
    onSendVerification: PropTypes.func,
  };
  
  static defaultProps = {
    enabled: true,
  };

  render() {
    const {
      enabled,
      permissions,
      sentPermissions,
      onRequestPermission,
      onSendVerification,
      status,
    } = this.props;

    return (
      <div>
        {status === 'SENT' && 
          <div>
            Congrats it was received!
          </div>
        }
        {status === 'RECEIVED' && Object.entries(sentPermissions).map(([key, value]) => {
          return (
            <ReceivedPermission
              key={key}
              name={key}
              value={value}
            />
          );
          })
        }
        {status !== 'SENT' && status !== 'RECEIVED' && Object.entries(permissions).map(([key, {
          name,
          description,
          requested,
          value,
          }]) => {
            if (status === 'SENDING' && requested) {
              return (
                <Permission
                  key={key}
                  permissionKey={key}
                  enabled
                  name={name}
                  description={description}
                  requested={requested}
                  value={value}
                  onRequestPermission={onRequestPermission}
                  status={status}
                />
              );
            }
            else if (status !== 'SENDING')
              return (
                <Permission
                  key={key}
                  permissionKey={key}
                  enabled={enabled}
                  name={name}
                  description={description}
                  requested={requested}
                  value={value}
                  onRequestPermission={onRequestPermission}
                  status={status}
                />
              );
        })}
        {status === 'SENDING' && 
          <Button
            text="Send your verification"
            onClick={onSendVerification}
          />
        }
      </div>

    );
  }
}
