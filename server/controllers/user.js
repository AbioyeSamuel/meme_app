import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        
        if(!existingUser){
            return res.status(404).json({ message: "User doesn't exist." }); 
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        
        if (!isPasswordCorrect) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        // Generate JWT token and send back to client if password is correct.
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'test', { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json( { message: "Something went wrong." });
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }
        
        if(password !== confirmPassword) {
            return res.status(400).json({ message: "Password does not match" });
        } 
        // We have to hash password here so that we dont store in a plain text. 12 is the Salt length
        const hashedPassword = await bcrypt.hash(password, 12);
        console.log("hashed Password", hashedPassword);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
}