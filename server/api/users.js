const User = require('../db/User');
const config = require('../config');
const passport = require('passport');
const jwt = require('jsonwebtoken');


module.exports = function(router){
    router.post('/signup', function(req, res) {
      if (!req.body.email || !req.body.password || !req.body.name || !req.body.username) {
        res.json({
          success: false,
          message: 'Please enter a username, name, email and password.'
        });
      } else {
        let newUser = new User({
          username: req.body.username,
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });


        // Attempt to save the user
        newUser.save(function(err) {
            console.log(err);
          if (err) {
            let message = '';
            if (err.message.indexOf('email') > 0) {
              message = 'Email is already taken. Please enter a new one.';
            } else if (err.message.indexOf('username') > 0) {
              message = 'Username is already taken. Please enter a new one.'
            } else {
              message = 'Oops, something went wrong, please try again later';
            }
            return res.json({
              success: false,
              message: message
            });
          }

          // send token back and log it
          var token = jwt.sign(newUser.toJSON(), config.auth.secret, {
            expiresIn: "30d"
          }); 
          res.json({
            success: true,
            user: newUser,
            message: 'Successfully created new user.',
            token
          });
        });
      }
    });

    router.post('/login', (req, res) => {
      User.findOne({
        username: req.body.username
      }, function(err, user) {
        if (err) throw err;

        if (!user) {
          res.send({
            success: false,
            message: 'The username you entered doesn\'t belong to an account.'
          });
        } else {
          // Check if password matches
          user.comparePassword(req.body.password, function(err, isMatch) {
            if (isMatch && !err) {
              // Create token if the password matched and no error was thrown
              var token = jwt.sign(user.toJSON(), config.auth.secret, {
                expiresIn: "30d"
              });
              res.json({
                success: true,
                message: 'Authentication successful',
                user,
                token
              });
            } else {
              res.send({
                success: false,
                message: 'The password you entered was incorrect.'
              });
            }
          });
        }
      });
    });


    router.route('/user').get(passport.authenticate('jwt', {
      session: false
    }), function(req, res){
      res.json(req.user);
    });

    router.route('/user').put(passport.authenticate('jwt', {
      session: false
    }), function(req, res){
      let user = req.user;

      if (req.body.answers) {
        user.answers = req.body.answers;
      }
      if (req.body.name) {
        user.name = req.body.name;
      }
      if (req.body.categories) {
        user.categories = req.body.categories;
      }

      console.log(user);

      user.save((err, user) => {
        if (err) {
            res.status(500).send(err)
        }
        res.status(200).send(user);
      });
    });
}