import{ User } from '../models/user.model.js'
export const authCallback = async (req, res) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body; // That's how clerk stores users data

        // check if user already exists
        const user = await User.findOne({ clerkId: id })
        if(!user) {
            const newUser = new User({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl
            })
            newUser.save();
        }
        res.status(200).json({success: true});
    } catch (error) {
        console.log("Error in auth callback controller", error);
        next(error);
    }
}