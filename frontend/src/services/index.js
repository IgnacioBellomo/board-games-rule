import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  ? (baseURL = 'https://board-games-rule.herokuapp.com/')
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
  addGame: async (data) => {
    return await service.post('/add-game', {gameId: data});
  },
  removeGame: async (data) => {
    return await service.post('/remove-game', {gameId: data});
  },
  findUsers: async email => {
    return await service.post('/find-users', {email: email});
  },
  updateProfile: async data => {
    return await service.post('/update-profile', data);
  },
  getUser: async data => {
    return await service.post('/get-user', data);
  },
  changePassword: async data => {
    return await service.post('/change-password', data);
  },
  
};

export default actions;
