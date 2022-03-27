const SignUpValidation = require("../validations/SignUpValidation")
const slugify = require("slugify")
const Path = require("path")
const users = require("../models/UserModel")
const SendMail = require("../modules/email")
const { PORT } = require("../../config")
const { generateToken } = require("../../../ecommerce_fronted/src/modules/jwt")
const { generateHash } = require("../../../ecommerce_fronted/src/modules/bcrypt")
const { v4 } = require("uuid")
const SignInValidation = require("../validations/SignInValidation")
const { compareHash } = require("../modules/bcrypt")
const { checkToken } = require("../modules/jwt")

module.exports = class User {
    static async SignUpGET(req, res) {
        res.render("signup", {
            title: "Sign Up || Rizqimuz",
        })
    }

    static async SignUpPOST(req, res) {
        try {
            let { first_name, last_name, email, password, role } = await SignUpValidation(req.body)

            let user = await users.findOne({
                email,
            })
    
            if(user) {
                res.redirect("/login")
                return
            }
    
            let slug = await slugify(`${first_name} + ${last_name}`, {
                replacement: (''),
                lower: true,
                remove: /[*+~.()'"!:@]/g,
            })
    
            let slugFind = await users.findOne({
                slug,
            }) 
            
            if(slugFind) {
                let random = Math.random() * 10
                slug = `slug${random}`
            }
    
            let pass = await generateHash(password)
    
            user = await users.create({
                user_id: v4(),
                first_name,
                last_name,
                slug, 
                email, 
                pass,
                role
            })
    
            console.log(user)
    
            let token = generateToken({
                ...user._doc,
                pass: undefined,
            })
    
            await SendMail(
                email, 
                `Verification link`, 
                "Email verification", 
                `<p><a href="http://localhost:${PORT}/verify/${user.user_id}">Click here</a> to activate you account</p>`
            )
    
            res.cookie("token", token).redirect("/profile")    
        } catch(e) {
            console.log(e)
            res.render("signup", {
                ok: false,
                title: "Sign Up",
                message: e + "",
            })
        }            
    }

    static async verifyGET(req, res) {
        let { user_id } = req.params
        
        let user = await users.findOneAndUpdate({
            user_id,
        }, {
            is_verified: true,
        })

        res.redirect("/profile")
    }

    static async SignInGET(req, res) {
        res.render("signin", {
            title: "Sign in || Rizqimuz"
        })
    }

    static async SignInPOST(req, res) {
        try {
            let { email, password } = await SignInValidation(req.body)

            let user = await users.findOne({
                email,
            })
            
            if(!email) {
                res.redirect("signup")
                return
            }
    
            let isPasswordTrue = await compareHash(password, user.pass)
            
            if(!isPasswordTrue) {
                throw new Error("Parolingiz xato qayta urinib ko'ring")
            }
    
            let token = generateToken({
                ...user._doc,
                pass: undefined,
            })   
    
            res.cookie("token", token).redirect("/profile")            
        } catch(e) {
            console.log(e)
            res.render("signin", {
                message: e + "",
                title: "Sign In || Rizqimuz"
            })
        }
    }

    static async ProfileGET(req, res) {
        try {
            let { token } = req.cookies

            if(!token) {
                res.redirect("/login")
                return
            }

            token = await checkToken(token)
            
            let { email } = token
    
            let user = await users.findOne({
                email,
            })

            res.redirect(`profile/${user.slug}`)
        } catch(e) {
            res.render("404", {
                ok: false,
                message: e + "",
                title: "404",
            })
        }
    }

    static async ProfileSlugGET(req, res) {
        try {
            let { slug } = req.params

            let user = await users.findOne({
                slug,
            })

            if(user.is_verified == false) throw new Error("Emailingizni tasdiqlang")
            
            res.render("profile", {
                title: `${user.first_name} ${user.last_name} || Rizqimuz`,
                user
            })            
        } catch(e) {
            res.render("404", {    
                title: `|| 404`,
                message: e + "",
            }) 
        }
    }

    static async AvatarPATCH(req, res) {
        try {
            let { photo } = req.files

            let { token } = req.cookies

            let email = checkToken(token)

            let imageType = photo.mimetype.split("/")[0]
            let imageFormat = photo.mimetype.split("/")[1]
            let imageName = photo.md5
    
            if(imageType === "image" || imageType === "vector") {
                let imagePath = Path.join(__dirname, "..", "public", "img", "users", `${imageName}.${imageFormat}`)
    
                await photo.mv(imagePath)
                let user =  await users.findOneAndUpdate({
                    email,
                }, {
                    avatar: imagePath,
                })
                console.log(user)
            } else {
                throw new Error("Image type 'image' or 'vector'") 
            }

            res.status(200).json({
                ok: true,
            })
        } catch(e) {
            res.status(400).json({
                ok: false,
                message: e + "",
            }) 
        }


    }


}