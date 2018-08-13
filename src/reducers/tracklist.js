import {ADD_TRACK, DEL_TRACK} from '../actions/tracklist'

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_TRACK:
    return [...state,action.payload]
    
    case DEL_TRACK:
    return [...state].filter( (item,index) => index != action.payload)

    default:
    return state
  }
}

const initialState = 
[
  {
  active: false,
  artist: 'Duran Duran',
  title: 'rio',
  art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHaNIyjHbvSiCnhweKKXHy0gEu7FRwfjJIQOSelHeuVRClNveASNKDr0uECnC5BQTcMQ',
  duration: 241
  },
  {id:2,
  active: false,
  artist: 'Fluran Duran',
  title: 'Crio',
  art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHaNIyjHbvSiCnhweKKXHy0gEu7FRwfjJIQOSelHeuVRClNveASNKDr0uECnC5BQTcMQ',
  duration: 205
  },
  {id:6,
  active: false,
  artist: 'Fluran Duran',
  title: 'C6rio',
  art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHaNIyjHbvSiCnhweKKXHy0gEu7FRwfjJIQOSelHeuVRClNveASNKDr0uECnC5BQTcMQ',
  duration: 205
  },
  {id:3,
  active: false,
  artist: 'Fluran Duran',
  title: 'Crio',
  art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHaNIyjHbvSiCnhweKKXHy0gEu7FRwfjJIQOSelHeuVRClNveASNKDr0uECnC5BQTcMQ',
  duration: 205
  },
  {id:4,
  active: true,
  artist: 'Andre Hazes',
  title: 'De Vlieger',
  art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHaNIyjHbvSiCnhweKKXHy0gEu7FRwfjJIQOSelHeuVRClNveASNKDr0uECnC5BQTcMQ',
  duration: 205
  },
  {id:5,
  active: false,
  artist: 'Fluran Duran',
  title: 'Crio',
  art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHaNIyjHbvSiCnhweKKXHy0gEu7FRwfjJIQOSelHeuVRClNveASNKDr0uECnC5BQTcMQ',
  duration: 205
  }
]

// probeer eens wat....
// const initialState = [{
//   id: 3,
//   title: 'wessel'
// }]

export default reducer
