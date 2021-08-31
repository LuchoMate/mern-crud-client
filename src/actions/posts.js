import { FETCH_ALL, UPDATE, CREATE, LIKE, DELETE } from '../constants/actionTypes';
import * as api from '../api'

//Action creators - functions that return an action

//redux esta despachando datos desde el back

export const getPosts = () => async(dispatch) => {// esta es la forma de redux-thunk
    try {
        const {data} = await api.fetchPosts();
        dispatch({type: FETCH_ALL, payload: data})
    } catch (error) {
        console.log(error)  
    }
}

export const createPost = (post) => async(dispatch) => {
    try {
        const { data } = await api.createPost(post)
        dispatch({type: CREATE, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error)  
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({type: DELETE, payload: id})
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async(dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({type: LIKE, payload: data})
    } catch (error) {
        
    }
}