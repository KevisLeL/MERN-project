const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const getCoordsForAddress = require('../util/location');
const HttpError = require('../models/http-error');

let DUMMY_PLACES = [{
  id: 'p1',
  title: 'Victoria Falls',
  description: 'One of the natural wonders of the world, and the biggest African Falls',
  address: 'Victoria Falls, Zimbabue',
  location: {
      lat: -17.9253059,
      lng: 25.8527857
  },
  creator: 'u1'
},
{
  id: 'p2',
  title: 'Częstochowa',
  description: 'One of the most beautiful Poland cities. Home of the very handsome Margarita Gajzner',
  address: 'Królewska 10, 42-202 Częstochowa, Polonia',
  location: {
      lat: 50.7933561,
      lng: 19.1122647
  },
  creator: 'u2'
},
{
  id: 'p3',
  title: 'lololo',
  description: 'One of the most beautiful Poland cities. Home of the very handsome Margarita Gajzner',
  address: 'Królewska 10, 42-202 Częstochowa, Polonia',
  location: {
      lat: 50.7933561,
      lng: 19.1122647
  },
  creator: 'u2'
}
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError('Could not find a place for the provided id.', 404);
  }

  res.json({ place }); // => { place } => { place: place }
};

// function getPlaceById() { ... }
// const getPlaceById = function() { ... }

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const places = DUMMY_PLACES.filter(p => {
    return p.creator === userId;
  });

  if (!places || places.lenght === 0) {
    return next(
      new HttpError('Could not find places for the provided user id.', 404)
    );
  }

  res.json({ places });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError('Invalid inputs, check your data', 422));
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
 try {
  
  coordinates = await getCoordsForAddress(address);
 
  } catch (error) {
    return next(error);
 }
 
  // const title = req.body.title;
  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator
  };

  DUMMY_PLACES.push(createdPlace); //unshift(createdPlace)

  res.status(201).json({place: createdPlace});
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError('Invalid inputs, check your data', 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid; 

  const updatedPlace= { ...DUMMY_PLACES.find(p => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex( p => p.id === placeId );
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  // Este método también funciona pero copio el que hace él.
  // const place = DUMMY_PLACES.find(p => {
  //   return p.id === placeId;
  // });

  //   const updatedPlace = DUMMY_PLACES.splice(placeId, 1, req.body );
    
  res.status(200).json({place: updatedPlace})

};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid; 

  if(!DUMMY_PLACES.find( p => p.id === placeId)) {
    throw new HttpError('Could not find a place for that id.', 404);
  }

  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    
  res.status(200).json({message: 'Place succesfully deleted '})
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;

