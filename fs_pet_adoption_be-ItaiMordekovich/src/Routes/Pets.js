const express = require('express')
const multer = require('multer')
const router = express.Router()
const petsController = require('../Controllers/pets.controller')
const auth = require('../Constants/auth')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/Uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,`${uniqueSuffix}-${file.originalname}`)
    }
  })
const upload = multer({storage: storage})
 
router.get('/', petsController.getPet)
router.get('/:Id', petsController.getPetById)
router.post('/',upload.single('petImage'), petsController.createPet)
router.post('/:Id/adopt',auth.authenticateToken, petsController.updatePetAdoptionStatus)
router.post('/:Id/foster',auth.authenticateToken, petsController.updatePetAdoptionStatusFostered)
router.post('/:Id/return',auth.authenticateToken,petsController.returnPet)
router.post('/:Id/save',petsController.savePetForUser)
router.delete('/:Id/save',petsController.deletePetFromSavedForUser)
router.put('/:Id', auth.authenticateToken, petsController.EditPet)
router.get('/user/:Id', petsController.getUserSavedNOwnedPets)
module.exports = router


