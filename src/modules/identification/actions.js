import axios from 'axios';

export const formChange = ({ name, value }) => dispatch => {
  dispatch({
    type: 'FORM_CHANGE',
    name,
    value,
  });
};

export const requestPermission = ({ permissionKey, requested }) => async (dispatch, getState) => {

  await dispatch({
    type: 'REQUEST_PERMISSION',
    permissionKey,
    requested,
  });

  const identification = getState().identification;
  const {
    code,
    permissions,
  } = identification;

  const requestedPermissions = Object.entries(permissions)
    .filter(([key, { requested }]) => requested)
    .map(([key, value]) => key);

  axios.post('http://localhost:3000/v1/requests', {
    cardId: 'asdzx23',
    permissions: requestedPermissions,
    safetyCode: code,
  })
    .then(response => {
      if (response.data === 'session deleted') {
        dispatch({
          type: 'GENERATE_CODE',
          code: undefined,
        });
        dispatch({
          type: 'CHANGE_STATUS',
          status: 'IDLE',
        });
      }
      else {
        dispatch({
          type: 'GENERATE_CODE',
          code: response.data.safetyCode,
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const changeStatus = status => dispatch => {
  dispatch({
    type: 'CHANGE_STATUS',
    status,
  });
};

export const sendCode = code => dispatch => {
  console.log('sendcode!', code)
  axios.get(`http://localhost:3000/v1/requests/${code}`)
    .then(response => {
      const permissions = response.data.permissions;
      Object.entries(permissions).forEach(([permissionKey, requested]) => {
        console.log(permissionKey, requested)
        dispatch({
          type: 'REQUEST_PERMISSION',
          permissionKey,
          requested,
        });
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const sendVerification = () => (dispatch, getState) => {
  const identification = getState().identification;
  const {
    code,
    permissions,
  } = identification;

  const transformedPermissions = Object.keys(permissions).reduce((acc, permissionName) => {
    return { ...acc, [permissionName]: permissions[permissionName].requested };
  }, {});

  axios.post('http://localhost:3000/v1/submit', {
    permissions: transformedPermissions,
    safetyCode: code,
  })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};

export const longPoll = code => async (dispatch, getState) => {
  const identification = await getState().identification;
  const {
    status,
    requestStatus,
  } = identification;

  console.log(code)

  const serverStatus = window.setInterval(() => {
    axios.get(`http://localhost:3000/v1/requests/status/${code}`)
      .then(response => {
        console.log(response)
        if (response.data.status !== requestStatus) {
          dispatch({
            type: 'CHANGE_REQUEST_STATUS',
            requestStatus: response.data.status,
          });
        }
        if (response.data.status === "COMPLETE" && status !== "REQUESTOR_WAITING") {


          window.clearInterval(serverStatus);
          axios.get(`http://localhost:3000/v1/requests/${code}`)
            .then(response => {
              const sentPermissions = response.data;
              console.log(sentPermissions)

                dispatch({
                  type: 'SEND_ALL_PERMISSIONS',
                  sentPermissions,
                });

              dispatch({
                type: 'CHANGE_STATUS',
                status: 'RECEIVED'
              })
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, 2000);
}