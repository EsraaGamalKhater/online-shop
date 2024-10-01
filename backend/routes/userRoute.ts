import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUser,updateUser,changeUserPassword, changeLoggedUserPassword , setUserId, updateLoggedUser,uploadUserImage, resizeUserImage} from '../controller/user';
import { changeUserPasswordValidator, createUserValidator, deleteUserValidator, getUserValidator, updateUserValidator,changeLoggedUserPasswordValidator, updateLoggedUserValidator  } from '../utils/validator/usersValidator';

import { allowedTo, checkActive, protectRoutes } from '../controller/auth';
const usersRoute: Router = Router()
usersRoute.use(protectRoutes, checkActive);
usersRoute.get('/me', setUserId, getUser)
usersRoute.put('/updateMe', uploadUserImage,resizeUserImage,updateLoggedUserValidator, updateLoggedUser)
usersRoute.put('/changeMyPassword', changeLoggedUserPasswordValidator, changeLoggedUserPassword)
usersRoute.delete('/deleteMe', allowedTo('user'), setUserId,deleteUserValidator, deleteUser)


usersRoute.use(allowedTo('manager'));
usersRoute.route('/')
  .get(getAllUsers)
  .post(uploadUserImage, resizeUserImage,createUserValidator,createUser);

usersRoute.route('/:id')
  .get(getUserValidator, getUser)
  .delete( deleteUserValidator, deleteUser)
  .put(uploadUserImage, resizeUserImage, updateUserValidator,updateUser);
usersRoute.put('/:id/changePassword',changeUserPasswordValidator, changeUserPassword)
  
  
export default usersRoute;