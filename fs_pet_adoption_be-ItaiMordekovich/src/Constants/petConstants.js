exports.PET_ADOPTION_STATUSES = {Adopted: "Adopted", Fostered: "Fostered", Available: "Available"}
exports.PET_FILTER_TYPES = {type:"string", name:"string", adoptionStatus: "string", minWeight: "string", maxWeight: "string",minHeight:"string", maxHeight:"string"}

exports.PET_FILTER_FUNCTIONS = { minWeight : (weight) => ({key: "weight", value: {$gt: weight}}), maxWeight : (weight) => ({key: "weight", value: {$lt: weight}}),
maxHeight : (height) => ({key: "height", value: {$lt: height}}), minHeight : (height) => ({key: "height", value: {$gt: height}}),
name : (name) => ({key: "name", value: {$regex: name}})}
