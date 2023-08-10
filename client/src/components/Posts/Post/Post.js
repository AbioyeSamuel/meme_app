import React, { useEffect, useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useHistory } from "react-router-dom";

import { useDispatch } from 'react-redux';

import { deletePost, likePost } from "../../../actions/posts";

import useStyles from "./styles";


const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));

    const userId = user?.result?.googleId || user?.result?._id;
    const [likes, setLikes] = useState([]);
    const [hasLikedPost, setHasLikedPost] = useState(false);
    const [isShown, setIsShown] = useState(null);
    const [timeShown, setTimeShown] = useState(null);
    
    const handleLike = async () => {
        dispatch(likePost(post._id));

        setLikes(prevLikes => {
            if (hasLikedPost) {
                return prevLikes.filter((id) => id !== userId);
            } else {
                return [...prevLikes, userId];
            }
        });

        setHasLikedPost(prevHasLiked => !prevHasLiked);
    };

    useEffect(() => {
        if (post) {
            setLikes(post.likes);
            setHasLikedPost(post.likes.includes(userId));
        }
    }, [post, userId]);

    // 1 like, 2 likes
    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId)
              ? (
                <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
              ) : (
                <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
              );
          }
      
          return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    }

    const openPost = () => {
        history.push(`/posts/${post._id}`);
    }

    const mouseOver = () => {
        setIsShown(post.name);
        setTimeShown(moment(post.createdAt).fromNow());
    }

    const mouseOut = () => {
        setIsShown(null);
        setTimeShown(null);
    }

    return (
        <Card className={classes.card} raised elevation={6} onMouseOver={mouseOver} onMouseOut={mouseOut}>
            <div className={classes.cardAction} onClick={openPost}> 
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
                <div className={classes.overlay}>
                    <Typography variant="h6" >{isShown}</Typography>
                    <Typography variant="body2">{timeShown}</Typography>
                </div>
                {(user?.result?.googleId === post?.creator || user?.result?.id === post?.creator) && (
                
                <div className={classes.overlay2}>
                    <Button style={{color: "white"}} size="small" onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
                )}
              
                <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                
            </div>

            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?.id === post?.creator) && (
                <Button size="small" color="primary" disabled={!user?.result} onClick={() =>  dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post;