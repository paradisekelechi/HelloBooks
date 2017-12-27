import models from '../models';

const {
  User
} = models;

export default {
  /**
   * Get all users
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} response object
   */
  getUsers(req, res) {
    if (req.query.client === 'true') {
      return User
        .findAndCountAll({
          where: {
            deleted: false,
            user_type_id: 1
          }
        })
        .then((users) => {
          res.status(200).send({
            success: true,
            message: 'Users list successfully gotten ',
            users
          });
        })
        .catch(() => {
          res.status.send({
            success: false,
            message: 'Users list not obtained'
          });
        });
    }
    if (req.query.admin === 'true') {
      return User
        .findAndCountAll({
          where: {
            deleted: false,
            user_type_id: 2
          }
        })
        .then((users) => {
          res.status(200).send({
            success: true,
            message: 'Users list successfully gotten ',
            users
          });
        })
        .catch(() => {
          res.status.send({
            success: false,
            message: 'Users list not obtained'
          });
        });
    }
    if (req.query.deleted === 'true') {
      return User
        .findAndCountAll({
          where: {
            deleted: true,
          }
        })
        .then((users) => {
          res.status(200).send({
            success: true,
            message: 'Users list successfully gotten ',
            users
          });
        })
        .catch(() => {
          res.status.send({
            success: false,
            message: 'Users list not obtained'
          });
        });
    }
    return User
      .findAndCountAll({
        where: {
          deleted: false,
        }
      })
      .then((users) => {
        res.status(200).send({
          success: true,
          message: 'Users list successfully gotten ',
          users
        });
      })
      .catch(() => {
        res.status.send({
          success: false,
          message: 'Users list not obtained'
        });
      });
  },

  /**
   * Edit User
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} response object
   */
  editUser(req, res) {
    const {
      body: {
        userTypeId,
        accountTypeId,
        imageUrl,
        password
      }
    } = req;
    const {
      params: {
        userId
      }
    } = req;

    if (userId == null) {
      res.status(400).send({
        success: false,
        message: 'User Id is required'
      });
      return;
    }

    if (userTypeId == null && accountTypeId == null && imageUrl == null && password == null) {
      res.status(400).send({
        success: false,
        message: 'No data to edit'
      });
      return;
    }

    return User
      .update({
        user_type_id: userTypeId,
        account_type_id: accountTypeId,
        image: imageUrl
      }, {
        where: {
          id: userId
        }
      })
      .then(() => {
        res.status(200).send({
          success: true,
          message: 'User successfully updated',
          image: imageUrl
        });
      })
      .catch(() => {
        res.status(400).send({
          success: false,
          message: 'User not successfully updated'
        });
      });
  },

  /**
   * DeleteUser
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} response object
   */
  deleteUser(req, res) {
    const {
      params: {
        userId
      }
    } = req;
    if (userId == null) {
      res.status(400).send({
        success: false,
        message: 'User Id is required'
      });
      return;
    }

    return User
      .update({
        deleted: true,
      }, {
        where: {
          id: userId
        }
      })
      .then(() => {
        res.status(200).send({
          success: true,
          message: 'User successfully deleted'
        });
      })
      .catch(() => {
        res.status(400).send({
          success: false,
          message: 'User not successfully deleted'
        });
      });
  },
};
