import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import cartsModel from '../models/cartsModel';
import ApiErrors from '../utils/apiError';
import productsModel from '../models/productsModel';
import { CartItems, Carts } from '../interface/cart';
import couponsModel from '../models/couponsModel';

export const getUserCart = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const cart = await cartsModel.findOne({ user: req.user?._id });
  if (!cart) { return next(new ApiErrors("you don't have cart yet", 404)) };
  res.status(200).json({ length: cart.items.length, data: cart })
});

export const deleteUserCart = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const cart = await cartsModel.findOneAndDelete({ user: req.user?._id });
  if (!cart) { return next(new ApiErrors("you don't have cart to delete", 404)) };
  res.status(204).json()
});

export const addProductToCart = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const product = await productsModel.findById(req.body.product);
  if (!product) { return next(new ApiErrors('product not found', 404)) };
  let cart: any = await cartsModel.findOne({ user: req.user?._id });
  if (!cart) {
    cart = await cartsModel.create({
      user: req.user?._id,
      items: [{ product: product._id, price: product.price }],
    })
  } else {
    const productIndex: number = cart.items.findIndex((item: CartItems) => item.product._id!.toString() === req.body.product.toString());
    if (productIndex > -1) {
      cart.items[productIndex].quantity += 1;
    } else {
      cart.items.push({ product: product._id, price: product.price })
    }
  }
  calcTotalPrice(cart)
  await cart.save();
  res.status(200).json({ length: cart.items.length, data: cart })
});

export const removeProductFromCart = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const cart: any = await cartsModel.findOneAndUpdate({ user: req.user?._id }, {
    $pull: { items: { _id: req.params.itemId } }
  }, { new: true });
  calcTotalPrice(cart);
  await cart.save();
  res.status(200).json({ length: cart.items.length, data: cart });
});

export const updateProductQuantity = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const cart: any = await cartsModel.findOne({ user: req.user?._id });
  const productIndex: number = cart.items.findIndex((item: CartItems) => item._id!.toString() === req.params.itemId.toString());
  if (productIndex > -1) {
    cart.items[productIndex].quantity = req.body.quantity;
  } else {
    return next(new ApiErrors('product not exist in cart', 404))
  }
  calcTotalPrice(cart);
  cart.save(); 
  res.status(200).json({ length: cart.items.length, data: cart });
});

export const applyCoupon = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const coupon = await couponsModel.findOne({
    name: req.body.name,
    expireTime: { $gt: Date.now() }
  })
  if (!coupon) { return next(new ApiErrors('invalid or expired coupon', 400)) };
  const cart: any = await cartsModel.findOne({ user: req.user?._id });
  const totalPrice: number = cart.totalPrice;
  const totalPriceAfterDiscount = (totalPrice - (totalPrice * (coupon.discount / 100))).toFixed(2);
  cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
  cart.save();
  res.status(200).json({ length: cart.items.length, data: cart });
});



const calcTotalPrice = (cart: Carts): number => {
  let totalPrice: number = 0;
  cart.items.forEach((item: CartItems) => {
    totalPrice += item.price * item.quantity;
  });
  cart.totalPrice = totalPrice;
  cart.totalPriceAfterDiscount = undefined;
  return totalPrice;
}; 