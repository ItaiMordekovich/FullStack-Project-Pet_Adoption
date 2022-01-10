const petSchema = require('../Models/pet.model')
const UserSchema = require('../Models/user.model')
const petConstants = require('../Constants/petConstants')


exports.createPet = (req, res) => {
  console.log(req.body.name)
  console.log(req.file.filename)
    const newPet = new petSchema({
      type: req.body.type,
      name: req.body.name,
      adoptionStatus: req.body.adoptionStatus,
      picture: req.file.filename,
      height: req.body.height,
      weight: req.body.weight,
      color: req.body.color,
      bio: req.body.bio,
      hypoallergnic: req.body.hypoallergnic,
      dietery: req.body.dietery,
      breed: req.body.breed
    })
    newPet.save()
      .then(data => {
        res.status(200).json({
          message: 'A Pet was successfully created',
          request: {
            type: 'GET',
            url: 'localhost:5000/users/CreateUser/' + data._id
          }
        })
      }).catch(err => {
        res.status(500).json({
          message: { msgBody: 'An error has occurred whilst creating a new Data.', msgError: true, err },
        })
      })
}

exports.getPetById = async(req, res) =>{
    const petID = req.params.Id;
    const foundPet = await petSchema.findById(petID)
    if(foundPet){
      res.status(200).send(foundPet)
    }else{
      res.status(404).send("pet not found")
    }
}
exports.EditPet = async(req, res) =>{
  
  const petID = req.params.Id;
  const update = req.body;
  console.log(update)
    const newPet = await petSchema.findOneAndUpdate({_id: petID}, update, { new : true})
    console.log(newPet)
    if(newPet){
      res.status(200).send("success updating pet")
    }
    else{
      res.status(404).send("pet not found")
    }
}
exports.getPet = async(req, res) =>{
  try{
    const petFilter = req.query;
    console.log(petFilter)
    Object.entries(petFilter).forEach(([filterName, filterValue]) => {
      if(filterValue == "undefined"){
        delete petFilter[filterName]
        return;
      }
      if(!petConstants.PET_FILTER_TYPES[filterName] || typeof filterValue !== petConstants.PET_FILTER_TYPES[filterName] || filterValue.length == 0 ){
        delete petFilter[filterName]
        return;
      }
      if(petConstants.PET_FILTER_FUNCTIONS[filterName]){
        if(filterName === 'name'){
          const newName = petConstants.PET_FILTER_FUNCTIONS[filterName](petFilter[filterName])
          petFilter[filterName] = newName.value
        }
        else{
          const newValue = petConstants.PET_FILTER_FUNCTIONS[filterName](petFilter[filterName])
          if(petFilter[newValue.key]){
            petFilter[newValue.key] = { ...petFilter[newValue.key], ...newValue.value}
          }else{
            delete petFilter[filterName]
            petFilter[newValue.key]  = newValue.value
          }
        }
      }
    })
    const resPet = await petSchema.find(petFilter)
    if(resPet){
      res.status(200).send(resPet)
    }
    else{
      res.status(404).send("pet not found")
    }
    return;
  }catch(e){
    res.status(501).send("error while getting pet")
    console.log(e)
  }  
}
exports.updatePetAdoptionStatus = async(req,res) =>{
  const petID = req.params.Id;
  const petNewOwner = req.body.userEmail;
  console.log(petID)
  const newStatus = req.body.Type;
  if(Object.values(petConstants.PET_ADOPTION_STATUSES).includes(newStatus)){
    const newPet = await petSchema.findOneAndUpdate({_id: petID}, {adoptionStatus : newStatus}, { new : true})
    if(newPet){
      const petOwner = await UserSchema.findOne({email: petNewOwner})
      if(!petOwner) return res.status(404).send("user not found")
      if(petOwner.petsAdopted.includes(petID)) return res.status(403).send({msg: "tried to add existing pet to user"})
      petOwner.petsAdopted.push(petID);
      await petOwner.save();
      res.status(200).send("success changing pet status")
    }else{
      res.status(404).send("pet not found")
      return;
    }
  }else{
    res.status(400).send("pet adoption status is not in the allowed statuses")
    return;
  }
}
exports.updatePetAdoptionStatusFostered = async(req,res) =>{
  const petID = req.params.Id;
  const petNewOwner = req.body.userEmail;
  console.log(petID)
  const newStatus = req.body.Type;
  if(Object.values(petConstants.PET_ADOPTION_STATUSES).includes(newStatus)){
    const newPet = await petSchema.findOneAndUpdate({_id: petID}, {adoptionStatus : newStatus}, { new : true})
    if(newPet){
      const petOwner = await UserSchema.findOne({email: petNewOwner})
      if(!petOwner) return res.status(404).send("user not found")
      petOwner.petsFostered.push(petID);
      await petOwner.save();
      res.status(200).send("success changing pet status")
    }else{
      res.status(404).send("pet not found")
      return;
    }
  }else{
    res.status(400).send("pet adoption status is not in the allowed statuses")
    return;
  }
}
exports.returnPet = async(req,res) =>{
  const petID = req.params.Id;
  const petOwnerId = req.body.userId
  const petOwner = await UserSchema.findById(petOwnerId)
  const newPet = await petSchema.findOneAndUpdate({_id: petID}, {adoptionStatus : 'Available'}, { new : true})
    if(newPet && petOwner){
      petOwner.petsAdopted = petOwner.petsAdopted.filter(petId => petId != petID);
      await petOwner.save();
      res.status(200).send("success changing pet status to Available")
    }else{
      res.status(404).send("user / pet not found")
      return;
    }
}
exports.savePetForUser = async (req,res) =>{
    const petID = req.params.Id;
    const userWhoLiked = await UserSchema.findOne({email: req.body.userEmail})
    const validatePet = await petSchema.findById(petID);
    if(!validatePet || !userWhoLiked) return res.status(404).json({"msg": "unable to find pet / user"})
    userWhoLiked.petsLiked.push(petID)
    await userWhoLiked.save();
    return res.status(200).json({"msg":"success in saving to liked pets"})
}
exports.deletePetFromSavedForUser = async(req,res) =>{
  const petID = req.params.Id;
  const userWhoLiked = await UserSchema.findOne({email: req.body.userEmail})
  console.log(petID)
  console.log( req.body.userEmail)
  const validatePet = await petSchema.findById(petID);
  if(!validatePet || !userWhoLiked) return res.status(404).json({"msg": "unable to find pet / user"})
  userWhoLiked.petsLiked = userWhoLiked.petsLiked.filter(petId => petId != petID)
  await userWhoLiked.save();
  return res.status(200).json({"msg":"successfully deleted from liked pets"})
}
exports.getUserSavedNOwnedPets = async(req,res) =>{
  const userData = await UserSchema.findById(req.params.Id)
  if(userData){
    const {petsAdopted, petsFostered, petsLiked} = userData
    res.status(200).send({petsAdopted, petsFostered, petsLiked})
  }else{
    res.status(404).send({msg: "user not found"})
  }
}

