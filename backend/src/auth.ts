import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface IAuthData {
  username: string;
}

const TOKEN_SECRET = process.env.TOKEN_SECRET ?? "12312312312312312312312312";

function generateAccessToken(username: IAuthData) {
  return jwt.sign({ username }, TOKEN_SECRET, {
    expiresIn: "2h",
  });
}

export function login(
  req: Request<{}, { username?: string; password?: string }>,
  res: Response
) {
  if (req.body.username === "lstech" && req.body.password === "LStech123") {
    const token = generateAccessToken({ username: req.body.username });
    res.json(token);
  } else {
    res.sendStatus(400);
  }
}

export default function auth(
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);

    const auth = user as IAuthData & {exp : number};
	
	// const dateNow = Date.now();
	// console.log(dateNow >= auth.exp * 1000);

	if (Date.now() >= auth.exp * 1000) {
		return res.sendStatus(403);
	}

	next();
  });
}
