const router = require('express').Router()
const User = require('../models/user')
const bycrpt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authCheck = require('../middleware/check-auth')
const checkAuth = require('../middleware/check-auth')
router.post('/login', (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then((result) => {
            if (result.length < 1)  {
                return res.json({success:false,massgae:"User not found" })
            }
            const user = result[0];
            bycrpt.compare(req.body.password, user.password, (err, ret) => {
                if (ret) {
                    const payload = {
                        userId : user._id
                    }
                    const token = jwt.sign(payload,"webBatch")
                    return res.json({success:true, token:token , massgae:"Login Successful"})
                } else {
                    return res.json({ success: false, massgae: "Password do not match" }) 
                }
            })
        }).catch(err => {
            res.json({ success: false, message: "Auth failed " })
        })
})

router.post('/signup', (req, res) => {
    bycrpt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.json({ success: false, message: "Password hash Issue" })
        }
        const user = new User({
            displayName: req.body.displayName,
            email: req.body.email,
            password: hash
        });
        user.save()
            .then((result) => {
                return res.json({ success: true, message: "Account created Successfully" })
            })
            .catch((err) => {
                if (err.code === 11000) {
                    return res.json({ success: false, message: "E-mail already exists" })
                }
                res.json({ success: false, message: "server error" })
            })
    })

})

router.get('/profile', checkAuth, (req, res) => {
    const userId =  req.userData.userId;
    User.findById(userId)
         .exec()
         .then((result) => {
             if(result) {
                 res.json({success : true, data: result})
             }
         }).catch(err => {
            res.json({success : false, message: 'Mongo Error'}) 
         })
})

module.exports = router;