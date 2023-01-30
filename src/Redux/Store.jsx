const initialValue = {
  movies: [],
  users: [],
  currentUser: {},
  members: [],
  subscriptions: [],

};

const manageData = (state = initialValue, action) => {
  switch (action.type) {
    case "SET_MOVIES_DATA": {
      return { ...state, movies: [...action.payload] };
    }
    case "ADD_MOVIE": {
      const movies = [...state.movies]
      movies.push(action.payload)
      return { ...state, movies: [...movies] };
    }
   
    case "SET_SUBSCRIPTIONS_DATA": {
      return { ...state, subscriptions: [...action.payload] };
    }

    case "UPDATE_SUBSCRIPTIONS_DATA": {
      let subscriptions = [...state.subscriptions];
      console.log(action.payload);
      const index = subscriptions
        .map((s) => s.memberId)
        .indexOf(action.payload.memberId);

      subscriptions[index].movies.push({
        movieId: action.payload.movieId,
        date: action.payload.date,
      });

      return { ...state, subscriptions: [...subscriptions] };
    }
    case "CREATE_SUBSCRIPTIONS": {
      const subscriptions = [...state.subscriptions];
      subscriptions.push(action.payload);

      return { ...state, subscriptions: [...subscriptions] };
    }

    case "UPDATE_MOVIE": {
      let movies = [...state.movies];
      const index = movies
        .map((movie) => movie._id)
        .indexOf(action.payload._id);
      console.log(index);
      movies[index] = action.payload;

      return { ...state, movies: [...movies] };
    }
    case "SET_CURRENT_USER_DATA": {
      sessionStorage["userFirstName"] = action.payload.firstName;
      return { ...state, currentUser: { ...action.payload } };
    }
    case "UPDATE_MOVIES": {
      return { ...state, movies: [...state.movies, action.payload] };
    }
    case "DELETE_MOVIES": {
      let movies = [...state.movies];
      const index = movies.map((movie) => movie._id).indexOf(action.payload);
      console.log(index);
      movies.splice(index, 1);
      return { ...state, movies: [...movies] };
    }

    case "SET_MEMBERS": {
      return { ...state, members: [...action.payload] };
    }

    case "SET_USERS": {
      return { ...state, users: [...action.payload] };
    }

    case "UPDATE_MEMBER": {
      const members = [...state.members];

      const index = members
        .map((member) => member._id)
        .indexOf(action.payload._id);
      console.log(index);
      members[index] = action.payload;

      return { ...state, members: [...members] };
    }
    case "DELETE_MEMBER": {
      let members = [...state.members];
      const index = members.map((member) => member._id).indexOf(action.payload);
      console.log(index);
      members.splice(index, 1);
      return { ...state, members: [...members] };
    }

    case "ADD_MEMBER": {
      const newMember = action.payload.user;
      const memberId = action.payload.userId;
      newMember._id = memberId;
      return { ...state, members: [...state.members, newMember] };
    }

    default:
      return state;
  }
};

export default manageData;
