import axios from 'axios';

const initialState = {
    user: {
        auth_id: '',
        display_name: '',
        id: 0,
        img: ''
    },
    restaurantSearch: {
        restaurant: {},
    },
    restaurantList: [],
    currentLocation: '',
    favoriteRestaurants: [],
    friends: []
}

const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
const UPDATE_RESTAURANT_SEARCH = 'UPDATE_RESTAURANT_SEARCH';
const UPDATE_RESTAURANT_LIST = 'UPDATE_RESTAURANT_LIST';
const LOCATION_SEARCH = 'LOCATION_SEARCH';
const DELETE_RESTAURANT_FROM_LIST = 'DELETE_RESTAURANT_FROM_LIST';
const UPDATE_FAVORITE_RESTAURANTS = 'UPDATE_FAVORITE_RESTAURANTS';

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });

        case UPDATE_RESTAURANT_SEARCH:
            return Object.assign({}, state, { restaurantSearch: action.payload });

        case UPDATE_RESTAURANT_LIST:
            // console.log('in reducer', action.payload)
            return Object.assign({}, state, { restaurantList: action.payload });

        case LOCATION_SEARCH:
            return Object.assign({}, state, { currentLocation: action.payload });
        
        case DELETE_RESTAURANT_FROM_LIST: //problem lies here, not updating redux correctly. data is passed all the way up to this point.
            return Object.assign({}, state, { restaurantList: action.payload });
        
        case UPDATE_FAVORITE_RESTAURANTS:
            return Object.assign({}, state, { favoriteRestaurants: action.payload });

        default:
            return state;
    }
}

export function getUserInfo() {
    let userData = axios.get('/auth/me').then(userInfo => {
        return userInfo.data;
    })
    return {
        type: UPDATE_USER_INFO,
        payload: userData
    }
}

export function updateRestaurantSearch(latLng) {
    return {
        type: UPDATE_RESTAURANT_SEARCH,
        payload: latLng
    }
}

export function updateRestaurantList(restaurantList) {
    return {
        type: UPDATE_RESTAURANT_LIST,
        payload: restaurantList
    }
}

export function locationSearch(address) {
    return{
        type: LOCATION_SEARCH,
        payload: address
    }
}

export function deleteRestaurantFromList(newList){
    return{
        type: DELETE_RESTAURANT_FROM_LIST,
        payload: newList
    }
}

export function updateFavoriteRestaurants(favoriteList){
    return{
        type: UPDATE_FAVORITE_RESTAURANTS,
        payload: favoriteList
    }
}


