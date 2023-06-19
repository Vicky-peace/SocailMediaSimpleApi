import {createComment,getComments,updateComment,deleteComment,getComment} from '../controllers/commentsController.js';

const commentRoutes= (app) => {
    app.route('/comment')
      .get(getComments)
      .post(createComment)


    app.route('/comment/:comment_id')
    .get(getComment)
    .put(updateComment)
    .delete(deleteComment)
};

export default commentRoutes;