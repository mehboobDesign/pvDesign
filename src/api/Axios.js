import axios from 'axios';

export default axios.create({
    baseURL: 'http://pvsolution-app.ap-south-1.elasticbeanstalk.com/api/'
});