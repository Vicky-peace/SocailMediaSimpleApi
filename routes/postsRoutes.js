import {createPost,getPosts,getPost,updatePost,deletePost} from '../controllers/postsController.js';

const postRoutes= (app) =>{
    app.route('/posts')
    .get(getPosts)
    .post(createPost)


    app.route('/posts/:post_id')
    .get(getPost)
    .put(updatePost)
    .delete(deletePost)
};

export default postRoutes;