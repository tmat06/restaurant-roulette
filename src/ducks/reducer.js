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
    restaurantList: []
}

const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
const UPDATE_RESTAURANT_SEARCH = 'UPDATE_RESTAURANT_SEARCH';
const UPDATE_RESTAURANT_LIST = 'UPDATE_RESTAURANT_LIST';

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });

        case UPDATE_RESTAURANT_SEARCH:
            return Object.assign({}, state, { restaurantSearch: action.payload });

        case UPDATE_RESTAURANT_LIST:
            return Object.assign({}, state, { restaurantList: action.payload });

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
    console.log('hit in updateRestaurantList')
    return {
        type: UPDATE_RESTAURANT_LIST,
        payload: restaurantList
    }
}