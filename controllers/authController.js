import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//user registeration
export const register = async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);


    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo

        })
        await newUser.save();
        res.status(200).json({ success: true, message: "Successfully created" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create. Try again" });

    }
}

//user login

export const login = async (req, res) => {
    
    const email = req.body.email;
  
    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" })
        }
        // if user is exist then check the password or compare the password
        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);
        console.log(checkCorrectPassword)
        if (!checkCorrectPassword) {
            return res.status(401).json({ success: false, message: 'Incorrect email or password' })
        }
        const { password, role, ...rest } = user._doc;
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" });
       

        // set token in the browser cookies and send the response to the client 
        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: token.expiresIn
        }).status(200).json({
            token,
            data: { ...rest },
            role,
        }
        )


    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to login' })

    }
}
