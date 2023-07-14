import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { UserRequest } from "../../models/interfaces/user/UserResquest";

class CreateUserService {
    async execute({name, email, password}: UserRequest) {
        if (!email) {
            throw new Error("Email incorrect");
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (userAlreadyExists) {
            throw new Error("Email already exists");
        }

        const passwordHash = await hash(password, 8);

        const user = prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },

            select : {
                id: true,
                name: true,
                email: true
            }
        });

        return user;
    }
}

export { CreateUserService }