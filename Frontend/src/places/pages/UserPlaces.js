import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
{
    id: 'p1',
    title: 'Victoria Falls',
    description: 'One of the natural wonders of the world, and the biggest African Falls',
    imageUrl: 'https://lp-cms-production.imgix.net/image_browser/victoria-falls-aerial-shot.jpg?auto=format&fit=crop&q=40&sharp=10&vib=20&ixlib=react-8.6.4&w=1946',
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
    imageUrl: 'http://en.czestochowa.pl/page/file.php?id=2034',
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
    imageUrl: 'http://en.czestochowa.pl/page/file.php?id=2034',
    address: 'Królewska 10, 42-202 Częstochowa, Polonia',
    location: {
        lat: 50.7933561,
        lng: 19.1122647
    },
    creator: 'u2'
}];

const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;