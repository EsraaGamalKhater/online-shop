import { Router } from 'express';
import { login, signup , verifyResetCode,forgerPassword,resetCode} from '../controller/auth';
import { loginValidator, signupValidator,forgetPasswordValidator,resetPasswordValidator } from '../utils/validator/authValidator';

const authRoute: Router = Router()
authRoute.post('/signup', signupValidator, signup);
authRoute.post('/login', loginValidator, login);
authRoute.post('/forgetPassword', forgetPasswordValidator, forgerPassword);
authRoute.post('/verifyCode', verifyResetCode);
authRoute.put('/resetCode', resetPasswordValidator, resetCode);

export default authRoute;