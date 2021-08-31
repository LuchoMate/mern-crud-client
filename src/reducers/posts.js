import { FETCH_ALL, UPDATE, CREATE, LIKE, DELETE } from '../constants/actionTypes';


export default (posts =[], action) => {//state, action
    switch (action.type){
        case FETCH_ALL:
            return action.payload//estos seran los posts

        case CREATE:
            return [...posts, action.payload]

        case DELETE:
            return posts.filter((post) => post._id !== action.payload)

        case UPDATE:
        case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post)

        default:
            return posts;
    }
}