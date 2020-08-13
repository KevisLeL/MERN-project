const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error');

const DUMMY_PLACES = [{
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

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find(p => {
    return p.creator === userId;
  });

  if (!place) {
    return next(
      new HttpError('Could not find a place for the provided user id.', 404)
    );
  }

  res.json({ place });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
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
  const placeId = req.params.pid; // { pid: 'p1' }

  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });

    const updatedPlace = DUMMY_PLACES.splice(placeId, 1, req.body );
    
  res.status(200).json({place: updatedPlace})

};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });

    const deletedPlace = DUMMY_PLACES.splice(placeId, 1);
    
  res.status(200).json({message: 'Place deleted succesfully'})
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;

