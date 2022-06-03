const { Auth } = require('../model/auth_model')

const authController = {
    //register
    register: async(req, res) => {
        try {
            const { email, password, name } = req.body;
            const emailCheck = await Auth.findOne({ email });
            if (emailCheck) return res.json({ msg: "Username already used", success: false })
            const user = await Auth.create({
                email,
                password,
                name,
            })
            delete user.password;
            return res.status(200).json({ success: true, user });
        } catch (error) {
            const response = {
                success: false,
                user: error
            }
            res.status(409).json(response)
        }
    },
    // login
    login: async(req, res) => {
        try {
            const account = {
                email: req.body.email,
                password: req.body.password
            }
            const author = await Auth.findOne(account)
            if (author != null) {
                const response = {
                    success: true,
                    user: author
                }
                res.status(200).json(response)
            } else {
                res.status(409).json({
                    success: false
                })
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // update author
    updateAuth: async(req, res) => {
        try {
            const author = await Auth.findById(req.params.id)
            await author.updateOne({ $set: req.body })
            res.status(200).json('Updated successfully!')
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //get all authors
    getAllAuth: async(req, res) => {
        try {
            const auth = await Auth.find({ _id: { $ne: req.params.id } })
            const response = {
                data: auth
            }
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = authController;