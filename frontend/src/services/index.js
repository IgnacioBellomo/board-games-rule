import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  ? (baseURL = 'https://mymovielists.herokuapp.com/')
  : (baseURL = 'http://localhost:4000');

const service = axios.create({ withCredentials: true, baseURL });

const actions = {
  isLoggedIn: async () => {
    return await service.get('/is-logged-in');
  },
  signUp: async (user) => {
    return await service.post('/signup', user);
  },
  logIn: async (user) => {
    return await service.post('/login', user);
  },
  logOut: async () => {
    return await service.get('/logout');
  },
  validEmail: async (email) => {
    return await service.post('/validEmail', {email: email});
  },
  addMovie: async (data) => {
    return await service.post('/add-movie', data);
  },
  updateReview: async (data) => {
    return await service.post('/update-review', data);
  },
  addShow: async (data) => {
    return await service.post('/add-show', data);
  },
  removeShow: async showId => {
    return await service.post('/remove-show', {showId: showId});
  },
  removeMovie: async movieId => {
    return await service.post('/remove-movie', {movieId: movieId});
  },
  findUsers: async email => {
    return await service.post('/find-users', {email: email});
  },
  sendReq: async data => {
    return await service.post('/send-req', data);
  },
  acceptReq: async data => {
    return await service.post('/accept-req', data);
  },
  updateProfile: async data => {
    return await service.post('/update-profile', data);
  },
  getUser: async data => {
    return await service.post('/get-user', data);
  },
  removeFriend: async data => {
    return await service.post('/remove-friend', data);
  },
  changePassword: async data => {
    return await service.post('/change-password', data);
  },
  populateFeed: async data => {
    return await service.post('/populate-feed', {feed: data});
  },
  
};

export default actions;
