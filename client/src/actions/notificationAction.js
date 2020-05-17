import {ENQUEUE_SNACKBAR,CLOSE_SNACKBAR,REMOVE_SNACKBAR} from './types'

export const enqueueSnackbarAction = (notification) => {
    const key = notification.options && notification.options.key;

    return {
        type: ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

export const closeSnackbarAction = key => ({
    type: CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const removeSnackbar = key => ({
    type: REMOVE_SNACKBAR,
    key,
});

export const  enqueueSnackbar = (...args) => enqueueSnackbarAction(...args);
export const  closeSnackbar = (...args) => closeSnackbarAction(...args);