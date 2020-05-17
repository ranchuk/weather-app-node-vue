import {autoCompleteSearch as autoCompleteSearchAPI} from '../apiMap'

import React from 'react';
import Button from '@material-ui/core/Button';
import {SET_AUTO_COMPLETE, LOADING_AUTO_COMPLETE, ERROR_AUTO_COMPLETE} from '../actions/types';
import { enqueueSnackbar, closeSnackbar } from './notificationAction';
import axios from 'axios'
import config from '../config';

export const autoCompleteSearch = (query) => async (dispatch) => {

  dispatch(autoCompleteSearchLoading(true))
  try{
    // throw new Error('')
    // THIS IS WORKING API CALL, REMOVE ON PRODUCTION

    if(config.isProduction){
      const res = await axios.get(`/autoCompleteSearch?query=${query}`)
      dispatch({
        type: SET_AUTO_COMPLETE,
        payload: res.data.data
      });
      dispatch(autoCompleteSearchLoading(false))
    }
    else{
      setTimeout(()=>{
        dispatch({
          type: SET_AUTO_COMPLETE,
          payload: mockAutoCompleteData
        });
        dispatch(autoCompleteSearchLoading(false))
      }, 500)
    }
  }
  catch(err){
    dispatch(enqueueSnackbar({
      message: 'error fetching search information ',
      options: {
          key: new Date().getTime() + Math.random(),
          variant: 'error',
          action: key => (
              <Button onClick={() => dispatch(closeSnackbar(key))}>dismiss me</Button>
          ),
      },
    }))
    console.error(err.message)
    dispatch(autoCompleteSearchError(err))
    dispatch(autoCompleteSearchLoading(false))
  }
};

export const autoCompleteSearchLoading = (isLoading) => {
    return {
      type: LOADING_AUTO_COMPLETE,
      payload: isLoading
    };
};

export const autoCompleteSearchError = (err) => (dispatch) => {
  return {
    type: ERROR_AUTO_COMPLETE,
    payload: err
  };
};



const mockAutoCompleteData=  [
      {
        Version: 1,
        Key: '182536',
        Type: 'City',
        Rank: 10,
        LocalizedName: 'Athens',
        Country: {
          ID: 'GR',
          LocalizedName: 'Greece'
        },
        AdministrativeArea: {
          ID: 'I',
          LocalizedName: 'Attica'
        }
      },
      {
        Version: 1,
        Key: '316938',
        Type: 'City',
        Rank: 10,
        LocalizedName: 'Ankara',
        Country: {
          ID: 'TR',
          LocalizedName: 'Turkey'
        },
        AdministrativeArea: {
          ID: '06',
          LocalizedName: 'Ankara'
        }
      },
      {
        Version: 1,
        Key: '126995',
        Type: 'City',
        Rank: 11,
        LocalizedName: 'Alexandria',
        Country: {
          ID: 'EG',
          LocalizedName: 'Egypt'
        },
        AdministrativeArea: {
          ID: 'ALX',
          LocalizedName: 'Alexandria'
        }
      },
      {
        Version: 1,
        Key: '56912',
        Type: 'City',
        Rank: 13,
        LocalizedName: 'Anqing',
        Country: {
          ID: 'CN',
          LocalizedName: 'China'
        },
        AdministrativeArea: {
          ID: 'AH',
          LocalizedName: 'Anhui'
        }
      },
      {
        Version: 1,
        Key: '59083',
        Type: 'City',
        Rank: 15,
        LocalizedName: 'Anyang',
        Country: {
          ID: 'CN',
          LocalizedName: 'China'
        },
        AdministrativeArea: {
          ID: 'HA',
          LocalizedName: 'Henan'
        }
      },
      {
        Version: 1,
        Key: '102138',
        Type: 'City',
        Rank: 15,
        LocalizedName: 'Anshan',
        Country: {
          ID: 'CN',
          LocalizedName: 'China'
        },
        AdministrativeArea: {
          ID: 'LN',
          LocalizedName: 'Liaoning'
        }
      },
      {
        Version: 1,
        Key: '202438',
        Type: 'City',
        Rank: 15,
        LocalizedName: 'Ahmedabad',
        Country: {
          ID: 'IN',
          LocalizedName: 'India'
        },
        AdministrativeArea: {
          ID: 'GJ',
          LocalizedName: 'Gujarat'
        }
      },
      {
        Version: 1,
        Key: '2093',
        Type: 'City',
        Rank: 20,
        LocalizedName: 'Algiers',
        Country: {
          ID: 'DZ',
          LocalizedName: 'Algeria'
        },
        AdministrativeArea: {
          ID: '16',
          LocalizedName: 'Alger'
        }
      },
      {
        Version: 1,
        Key: '126831',
        Type: 'City',
        Rank: 20,
        LocalizedName: 'Addis Ababa',
        Country: {
          ID: 'ET',
          LocalizedName: 'Ethiopia'
        },
        AdministrativeArea: {
          ID: 'AA',
          LocalizedName: 'Addis Ababa'
        }
      },
      {
        Version: 1,
        Key: '178551',
        Type: 'City',
        Rank: 20,
        LocalizedName: 'Accra',
        Country: {
          ID: 'GH',
          LocalizedName: 'Ghana'
        },
        AdministrativeArea: {
          ID: 'AA',
          LocalizedName: 'Greater Accra'
        }
      }
    ]