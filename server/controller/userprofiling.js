// Import User model
import models from '../models';

const { User } = models;

/* eslint-disable no-console */

const profileUsers = () => {
  User
    .findAll({
      where: {
        deleted: false,
      }
    })
    .then((users) => {
      console.log(users);
    })
    .catch(() => {
      console.log('Something happened on getting all the users of the application');
    });
};

export default profileUsers;
