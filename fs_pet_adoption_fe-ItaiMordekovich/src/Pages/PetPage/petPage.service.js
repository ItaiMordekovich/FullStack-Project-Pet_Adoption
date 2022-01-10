import { AdoptPet, FosterPet, returnPetToShelter, SavePet, unSavePet } from './../../Services/pets.service';

export const petUserActionController = async(action , params) =>{
    try{
        const test = {
            adopt: async() => await AdoptPet(params.Id,params.email, params.Type),
            foster: async() => await FosterPet(params.Id,params.email, params.Type),
            save: async() => await SavePet(params.Id,params.email),
            deletePetFromSaved: async() => await unSavePet(params.Id, params.email),
            returnPet: async() => await returnPetToShelter(params.userId, params.petId),
        }
        const result = await test[action]()
        console.log(result)
        return [true,result ]

    }catch(e){
        return [ false, e]
    }
}