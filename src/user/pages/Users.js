import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [
      {
        id: "u1",
        name: "Kevin Robles",
        image:
          "https://scontent-mad1-1.xx.fbcdn.net/v/t31.0-8/p720x720/20934676_10210510378011286_4572010757152615500_o.jpg?_nc_cat=106&_nc_oc=AQnNjsfN9lMtti3S5G8jopiRy33whXPA6wMKMtjRwd_AUmGHD8ghxDxsoVv55-dOduE&_nc_ht=scontent-mad1-1.xx&_nc_tp=1002&oh=65d6ce502110d06b4b98ba0e3a49b1bc&oe=5E9B4BFD",
        places: 3
      },
      {
        id: "u2",
        name: "Marga Gajzner",
        image:
          "https://scontent-mad1-1.xx.fbcdn.net/v/t31.0-8/p720x720/20934676_10210510378011286_4572010757152615500_o.jpg?_nc_cat=106&_nc_oc=AQnNjsfN9lMtti3S5G8jopiRy33whXPA6wMKMtjRwd_AUmGHD8ghxDxsoVv55-dOduE&_nc_ht=scontent-mad1-1.xx&_nc_tp=1002&oh=65d6ce502110d06b4b98ba0e3a49b1bc&oe=5E9B4BFD",
        places: 4
      }
    ];
    
    return <UsersList items={USERS}/>;

};

export default Users;