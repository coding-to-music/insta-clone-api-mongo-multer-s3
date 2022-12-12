import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { GetUserAuthHeader } from "../models/interfaces";
import HttpError from "../models/http-error";

const checkAuth = (
  req: GetUserAuthHeader,
  res: Response,
  next: NextFunction
) => {
  //Authorization: 'Bearer TOKEN'
  let token: string;
  try {
    //needed for browser convention, before intended method/verb is sent, browser
    //sends OPTIONS request to check if server accepts the incoming verb
    if (req.method === "OPTIONS") {
      return next();
    }
    token = (req.headers.authorization as string).split(" ")[1];
    if (!token) {
      return next(new HttpError("Not Authorized!", "401"));
    }

    const decodedToken: JwtPayload = jwt.verify(
      token,
      `${process.env.JWT_SECRET_KEY}`
    ) as JwtPayload;

    req.userData = { userId: decodedToken.userId };

    next();
  } catch (err) {
    //error is header isnt formatted or split correctly, or token missing
    return next(new HttpError("Authorization failed", "401"));
  }
};

export default checkAuth;
