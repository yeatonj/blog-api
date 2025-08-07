const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;

// DB queries
const { getUserFromId } = require('../models/userQueries');

// Set options
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey =  process.env.SECRET;
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    let user;
    try {
        user = await getUserFromId(jwt_payload.user.id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));
