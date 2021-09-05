import React, {useEffect, useState} from 'react'
import { Container, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'//action dispatcher
import { getPosts } from '../../actions/posts'
import useStyles from './styles'
import Form from '../Form/Form'
import Posts from '../Posts/Posts'

const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPosts());//va al post reducer
    }, [currentId, dispatch]);

    return(
        <Grow in>
            <Container>
                <Grid container className={classes.appContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home