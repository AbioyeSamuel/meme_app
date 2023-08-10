import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({setCurrentId}) => {
    const { posts, isLoading } = useSelector((state) => state.posts); // [] -> { isLoading, posts: [] }
    const classes = useStyles();

    console.log(posts);
    
    if (!posts.length && !isLoading){
        return'No Posts'
    }
    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((posts) => (
                    <Grid key={posts._id} item xs={12} sm={12} md={6} lg={4}>
                        <Post post={posts} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )      
    )
}

export default Posts;