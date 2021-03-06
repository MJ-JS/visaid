const initialState = {
  code: undefined,
  status: 'IDLE',
  requestStatus: undefined,
  permissions: {
    name: {
      name: 'Name',
      description: 'You will receive the users full name',
      requested: false,
      value: undefined,
    },
    dateOfBirth: {
      name: 'Birthday',
      description: 'You will receive the users date of birth',
      requested: false,
      value: undefined,
    },
    address: {
      name: 'Address',
      description: 'You will receive the users city, zipcode and state',
      requested: false,
      value: undefined,
    },
    mobilePhoneNumber: {
      name: 'Mobile Number',
      description: 'You will receive the area code and last four digits of the users cell phone',
      requested: false,
      value: undefined,
    },
    ssn: {
      name: 'Social Security Number',
      description: 'We will verify that the user has a valid Social Security Number',
      requested: false,
      value: undefined,
    },
    creditRating: {
      name: 'Credit Rating',
      description: 'We will give you a rating of the users credit score',
      requested: false,
      value: undefined,
    },
    visaStanding: {
      name: 'Visa Standing',
      description: 'We will verify the users Visa standing',
      requested: false,
      value: undefined,
    },
    income: {
      name: 'Income',
      description: 'We will show you the users income range',
      requested: false,
      value: undefined,
    },
  },
  sentPermissions: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FORM_CHANGE': {
      const {
        name,
        value,
      } = action;

      return {
        ...state,
        [name]: value,
      };
    }

    case 'GENERATE_CODE': {
      const { code } = action;

      return {
        ...state,
        code,
        isRequesting: true,
      };
    }
    
    case 'CHANGE_STATUS': {
      const { status } = action;
      
      return {
        ...state,
        status,
      };
    }

    case 'REQUEST_PERMISSION': {
      const { 
        permissionKey,
        requested,
      } = action;

      return {
        ...state,
        permissions: {
          ...state.permissions, 
          [permissionKey]: {
            ...state.permissions[permissionKey],
            requested,
          },
        },
      };
    }
    
    case 'ACCEPT_PERMISSION': {
      const {
        permissionKey,
        accepted,
      } = action;
      
      return {
        ...state,
        sendingPermissions: {
          ...state.sendingPermissions,
          [permissionKey]: {
            ...state.sendingPermissions[permissionKey],
            accepted,
          },
        },
      };
    }
    
    case 'SEND_ALL_PERMISSIONS': {
      const { sentPermissions } = action;
      
      return {
        ...state,
        sentPermissions,
      };
    }
    
    case 'CHANGE_REQUEST_STATUS': {
      const { requestStatus } = action;
      
      return {
        ...state,
        requestStatus,
      }
    }

    default:
      return state;
  }
};

export default reducer;
