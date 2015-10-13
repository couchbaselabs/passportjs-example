var passport = require("passport");
var AccountModel = require("../models/accountmodel");

var appRouter = function(app) {

    /*
     * The default landing page.  Show the user only a Facebook sign in button
     */
    app.get("/", function(req, res, next) {
        res.render("index", {});
    });

    /*
     * Start the Facebook oauth flow for sign in
     */
    app.get("/auth/facebook", passport.authenticate("facebook"));

    /*
     * Where to land after Facebook has signed in or failed at signing in
     */
    app.get("/facebook/callback", passport.authenticate("facebook", {successRedirect: "/secure"}));

    /*
     * A secure page protected by PassportJS
     */
    app.get("/secure", function(req, res, next) {
        if(!req.user) {
            return res.redirect("/");
        }
        AccountModel.findByUserId(req.user, function(error, result) {
            res.render("secure", {"profile": result});
        });
    });

    /*
     * A secure page protected by PassportJS.  POST requets end up here
     */
    app.post("/secure", function(req, res, next) {
        if(!req.user) {
            return res.redirect("/");
        }
        AccountModel.updateUser(req.user, req.body, function(error, result) {
            if(!error) {
                res.redirect("/secure");
            }
        })
    });

}

module.exports = appRouter;
