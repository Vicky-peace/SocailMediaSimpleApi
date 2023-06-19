import {getUsers,createUser,getUser,updateUser,deleteUser} from '../controllers/userController.js';

const userRoutes = (app) =>{
    app.route('/users')
    .get(getUsers)
    .post(createUser)

    app.route('/users/:user_id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)
};


export default userRoutes;
