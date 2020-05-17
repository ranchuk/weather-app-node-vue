import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {debounced} from '../../utils'
import {currentCityAction} from '../../actions/currentCityAction'
import {SET_AUTO_COMPLETE} from '../../actions/types'
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import {
    enqueueSnackbar,closeSnackbar,
  } from '../../actions/notificationAction';
import Button from '@material-ui/core/Button';

const SearchBar = () => {
    const dispatch = useDispatch()
    const [query, setQuery] = useState('')
    const [isOpen,setIsOpen] = useState(false)
    const autoComplete = useSelector((state) => state.autoComplete)
    const isLoading = autoComplete.loading;

    const onSelect = (city) => {
        setQuery(city.LocalizedName)
        setIsOpen(false)
        dispatch(currentCityAction(city))
    }

    const onQueryChange = (e) => {
        const query= e.target.value

        if(query === '') {
            setIsOpen(false)
            setQuery(query)
            dispatch({
                type: SET_AUTO_COMPLETE,
                payload: null
            });
        }

        else if(/^[a-zA-Z\s]+$/.test(query)){
            if(query !== '') {
                setQuery(query)
                !isOpen && setIsOpen(true)
                debounced(query)
            }
        }
        else {
            dispatch(enqueueSnackbar(
                                            {
                                                message: 'Invalid input. accept only english letters',
                                                options: {
                                                    key: new Date().getTime() + Math.random(),
                                                    variant: 'error',
                                                    autoHideDuration: 5000,
                                                    action: key => (
                                                        <Button onClick={() => dispatch(closeSnackbar(key))}>Close</Button>
                                                    ),
                                                    anchorOrigin: {
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    },
                                                },
                                            }
                                    )
                    )
            //alert('Only english letters allowed')
        }
    }

    return <div onBlur={(e)=>{setTimeout(()=>setIsOpen(false),100)}}>
                        <SearchInput placeholder={'Search City'} onChange={onQueryChange} value={query} onFocus={(e)=>query !== '' && setIsOpen(true)}/>
                        {isLoading ? <SpinnerWrapper><CircularProgress size={20}/></SpinnerWrapper> :
                        isOpen && <CitiesList onSelect={onSelect}/>}
            </div>
}

export default SearchBar

const SearchInput = styled.input`
    border: 1px solid black;
    border-radius: 3px;
    font-size: 2rem;
    padding: 1rem;
`;
const SpinnerWrapper = styled.span`
    position:absolute;
    right:20px;
    top:12px;
`;

const CitiesList = (props) => {
    const autoComplete = useSelector((state) => state.autoComplete)

    return <CitiesListStyle>{!autoComplete.loading && autoComplete.data && autoComplete.data.map((city, index)=>{
                return <CityItem key={index} onClick={(e)=>props.onSelect(city)}><h3>{city.LocalizedName}</h3></CityItem>
            })}
    </CitiesListStyle>
}

const CitiesListStyle = styled.div`
    position: absolute;
    z-index:1000;
    animation-name: dropDownSlow;
    animation-duration: 4s;
    animation-timing-function: ease-out;
    z-index: 1;
    @keyframes dropDownSlow {
        0% {
            height: 0px;
        }
        100% {
            height:100px;
        }
    }
`

const CityItem = styled.div`
    text-align: center;
    border: 1px solid black;
    border-radius: 3px;
    background-color:white;
    width:26.5rem;
    font-size: 1.5rem;
    padding: 1rem;
    cursor: pointer;
    :hover {
        background-color: gainsboro;
    }
`;