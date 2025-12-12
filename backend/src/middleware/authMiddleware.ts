import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/data-source";
import { Student } from "../entities/Student";
import { Admin } from "../entities/Admin";

interface CustomRequest extends Request {
    user?: Student | Admin | null;
}

export const protect = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");

            const studentRepo = AppDataSource.getRepository(Student);
            const adminRepo = AppDataSource.getRepository(Admin);

            // Try to find user in Student or Admin
            let user: Student | Admin | null = await studentRepo.findOneBy({ id: decoded.id });

            if (!user) {
                user = await adminRepo.findOneBy({ id: decoded.id });
            }

            if (user) {
                req.user = user;
                next();
            } else {
                res.status(401).json({ message: "Not authorized, user not found" });
            }

        } catch (error) {
            console.error(error);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
        return;
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};
