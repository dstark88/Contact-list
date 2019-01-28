var db = require("../models");

module.exports = function(app) {
    // this route should find all contacts in the table and display them as JSON
    app.get("/api/contacts", function(req, res) {
        console.log("hit get /api/contacts page");
        db.Contact.findAll({

        }).then(function(dbContact) {
            res.json(dbContact);
        }).catch(function(err) {
            console.log(err);
            res.json(err);
        })
    });

    // this route should add a new contact to the table
	app.post("/api/contacts", function(req, res) {
        console.log("hit post /api/contacts page");
        db.Contact.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                contactType: req.body.contactType,
                phoneNumber: req.body.phoneNumber || null,
                emailAddress: req.body.emailAddress || null
        }).then(function(dbContact) {
            console.log("new contact", dbContact.dataValues);
            res.json(dbContact);
        }).catch(function(err) {
            console.log(err);
            res.json(err);
        })
        
    });

    // this route should delete a contact from the table, if the id matches the ':id' url param
	app.delete("/api/contacts/:id", function(req, res) {
        console.log("hit delete /api/contacts page");
        db.Contact.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbContact) {
            res.json(dbContact);
        }).catch(function(err) {
            res.json(err);
        })
    });
}