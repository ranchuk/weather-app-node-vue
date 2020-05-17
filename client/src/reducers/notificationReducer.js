import {ENQUEUE_SNACKBAR,CLOSE_SNACKBAR,REMOVE_SNACKBAR} from '../actions/types'

const defaultState = {
    notifications: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ENQUEUE_SNACKBAR:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        key: action.key,
                        ...action.notification,
                    },
                ],
            };

        case CLOSE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.map(notification => (
                    (action.dismissAll || notification.key === action.key)
                        ? { ...notification, dismissed: true }
                        : { ...notification }
                )),
            };

        case REMOVE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.filter(
                    notification => notification.key !== action.key,
                ),
            };

        default:
            return state;
    }
};













// import {NOTIFICATION_ADD_FAVORITES_SUCCESS, NOTIFICATION_REMOVE_FAVORITES_SUCCESS} from '../actions/types'

  
//   const initialState = {
//     messages: []
//   };
  
//   export default function(state = initialState, action) {
//       let message = ''
//     switch (action.type) {
//         case NOTIFICATION_ADD_FAVORITES_SUCCESS:
//                 message = `${action.payload} added to favorites`
//                 return {
//                     ...state,
//                     messages: [...state.messages, {type:'success', message}],
//                 };
//         case NOTIFICATION_REMOVE_FAVORITES_SUCCESS:
//                 message = `${action.payload} removed from favorites`
//                 return {
//                     ...state,
//                     messages: [...state.messages, {type:'success', message}],
//                 };
//         default:
//                 return state;
//     }
//   }