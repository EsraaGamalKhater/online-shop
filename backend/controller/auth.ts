import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
import usersModel from "../models/userModel";
import { Users } from "../interface/user";
import ApiErrors from "../utils/apiError";
import { createToken,createResetToken } from "../utils/createToken";
import Jwt from 'jsonwebtoken';
import sendMail from "../utils/sendMail";
import crypto from 'crypto';

export const signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // const hashedPassword = await bcrypt.hash(req.body.password, 12);
  // req.body.password = hashedPassword;
  const user: Users = await usersModel.create(req.body);
  const token = createToken(user._id, user.role);
  res.status(201).json({ token, data: user })
});

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await usersModel.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiErrors('invalid email or password', 401))
  }
  const token = createToken(user._id, user.role)
  res.status(200).json({ token, data: user })
});
//role
export const protectRoutes = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token: string = '';
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else { return next(new ApiErrors('please login first', 401)) }
  const decodedToken: any = Jwt.verify(token, process.env.JWT_KEY!);
  const user = await usersModel.findById(decodedToken._id);
  if (!user) { return next(new ApiErrors('user not found', 404)) }
  if (user.passwordChangedAt instanceof Date) {
    const changeTime: number = parseInt((user.passwordChangedAt.getTime() / 1000).toString())
    if (changeTime > decodedToken.iat) { return next(new ApiErrors('please login again', 401)) }
  }
  req.user = user;
  // console.log(req.user.role);
  next();
});

export const checkActive = asyncHandler((req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.active) { return next(new ApiErrors('you are not active', 403)) }
  next();
});
 
export const allowedTo = (...roles: string[]) =>
  asyncHandler((req: Request, res: Response, next: NextFunction) => {
    if (!(roles.includes(req.user?.role!))) { return next(new ApiErrors('you are not allowed to access this', 403)) };
    next();
  })

  // send email -> forget password
export const forgerPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await usersModel.findOne({ email: req.body.email });
  if (!user) { return next(new ApiErrors('user not found', 404)) };
  const resetCode: string = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetCode = crypto.createHash('sha256').update(resetCode).digest('hex');
  user.resetCodeExpireTime = Date.now() + (10 * 60 * 1000);
  user.resetCodeVerify = false;
  const message: string = `your reset password code is ${resetCode}`;
  try {
    await sendMail({ email: user.email, subject: 'Reset Password', message });
    await user.save({ validateModifiedOnly: true });
  } catch (err) {
    console.log(err);
    return next(new ApiErrors('error sending email', 400))
  }
  // const resetToken: string = createResetToken(user._id,user.role);
  const resetToken: string = createResetToken(user._id);
  res.status(200).json({ message: 'reset password code sent to your email', resetToken })
});
// verify code
export const verifyResetCode = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let resetToken: string = '';
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    resetToken = req.headers.authorization.split(' ')[1];
  } else { return next(new ApiErrors('get your reset code first', 400)) }
  const decodedToken: any = Jwt.verify(resetToken, process.env.JWT_KEY!);
  const hashedResetCode: string = crypto.createHash('sha256').update(req.body.resetCode).digest('hex');
  const user = await usersModel.findOne({
    _id: decodedToken._id,
    resetCode: hashedResetCode,
    resetCodeExpireTime: { $gt: Date.now() }
  })
  if (!user) { return next(new ApiErrors('invalid or expired reset code', 400)) };
  user.resetCodeVerify = true;
  await user.save({ validateModifiedOnly: true });
  res.status(200).json({ message: 'reset code verified' });
});

// reset password
export const resetCode = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let resetToken: string = '';
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    resetToken = req.headers.authorization.split(' ')[1];
  } else { return next(new ApiErrors("you can't do this action", 400)) }
  const decodedToken: any = Jwt.verify(resetToken, process.env.JWT_KEY!);
  const user = await usersModel.findOne({
    _id: decodedToken._id,
    resetCodeVerify: true
  })
  if (!user) { return next(new ApiErrors('verify your reset code first', 400)) };
  user.password = req.body.password;
  user.resetCode = undefined;
  user.resetCodeExpireTime = undefined;
  user.resetCodeVerify = undefined;
  user.passwordChangedAt = Date.now();
  await user.save({ validateModifiedOnly: true });
  res.status(200).json({ message: 'your password has been changed' });
});
 
