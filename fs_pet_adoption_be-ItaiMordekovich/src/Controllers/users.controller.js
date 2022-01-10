const UserSchema = require('../Models/user.model')
const auth = require('../Constants/auth')

exports.createUser = (req, res) => {
    const newUser = new UserSchema({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phNumber: req.body.phNumber,
      petsLiked: [],
      petsAdopted: []
    })
    const token = auth.generateToken({ username: req.body.email });
    newUser.save()
      .then(data => {
        const userDetails = JSON.parse(JSON.stringify(newUser));
        delete userDetails.password
        res.status(200).json({userDetails, token })
      }).catch(err => {
        console.log(err)
        res.status(500).json({
          message: { msgBody: 'An error has occurred whilst creating a new user.', msgError: true, err },
        })
      })
}

exports.authUser = async(req,res) =>{
  try{
    console.log(req.body.email)
    const reqUser = await UserSchema.findOne({email: req.body.email})
    if(reqUser){
      if(req.body.password == reqUser.password){
        const userDetails = JSON.parse(JSON.stringify(reqUser));
        delete userDetails.password
        const token = auth.generateToken({ username: req.body.email });
        console.log(userDetails)
        res.status(200).json({token, userDetails})
        return;
      }else{
        return res.status(401).json({"msg": "wrong password"})
      }
    }
    throw "not found"
  }catch(err){
    console.log(err)
    return res.status(404).json({msg: "user not found"})
  }
}

exports.getUser = async(req, res) => {
  const user = await UserSchema.findById(req.params.Id)
  if(user){
    const userDetails = JSON.parse(JSON.stringify(user));
    delete userDetails.password
    res.status(200).send(userDetails)
  }else{
    res.status(404).send({msg: 'user not found'})
  }
}
exports.changeUserDetails = async(req,res) =>{
  const userId = req.params.Id;
  const userData = await UserSchema.findById(userId)
  if(!userData) return res.status(404).send({msg: 'user does not exists'})
  const userNewData = {
    email: req.body.email,
    password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phNumber: req.body.phNumber,
      bio: req.body.bio,
  }
  if(checkIfEmailInUse(req.body.email)) return res.status(400).send({msg: 'email is already taken'})
  Object.entries(userNewData).forEach(([key, value]) => {
    if(typeof value == "string" && value.length>1){
      userData[key] = value
    }
  })
  userData.save()
  const userDetails = JSON.parse(JSON.stringify(userData));
    delete userDetails.password
  res.status(200).send({newUser: userDetails })
}
exports.getAllUsers = async(req, res)=>{
  const allUsers = await UserSchema.find()
  allUsers.map(user => {
    delete user.password;
  })
  res.status(200).send(allUsers)
}
const checkIfEmailInUse = (email) =>{
  if(email){
    const doesUserExists = userSchema.findOne({email})
    if(doesUserExists) return true;
    return false;
  }else{
    return false
  }
}