import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-d3e0b.firebaseio.com/'
});

export default instance;