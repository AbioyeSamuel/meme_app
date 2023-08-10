import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    name: String,
    key: "", //Key will be unique for each id in the Mongo Db Atlas Database
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;