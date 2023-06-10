import { RequestHandler } from 'express';
import { UserService } from './user.service';
import { z } from 'zod';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    // req - validation
    // body -- object
    // data -- object


    const { user } = req.body;
    const result = await UserService.createUserToDb(user);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUser,
};
