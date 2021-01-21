import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#fff', 0.15),
    '&:hover': {
      backgroundColor: fade('#fff', 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

export const SearchField = (props) => {
    const classes = useStyles();

    const [citySearch, setCitySearch] = useState('')

    const handleCitySearchInput = (e) => {
      setCitySearch(e.target.value)
    }

    const handleCityAdd = (e) => {
      e.preventDefault()
      props.handleCityAdd(citySearch)
      setCitySearch('')
  }

    return (
        <form className={classes.search} onSubmit={handleCityAdd}>
            <SearchIcon className={classes.searchIcon}/>
            <InputBase
              onChange = {handleCitySearchInput}
              value = {citySearch}
              placeholder="Search by city…"
              inputProps={{ 'aria-label': 'search' }}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              
            />
        </form>
    )
}
