var db = require("../models");

module.exports = function(app) {
    // this route should render the Handlebars 'form' template
	app.get("/contacts/new", function(req, res) {
        console.log("hit /contacts page");
        res.render("form", ); //for form.handlebars 
    });

    // this route should find all contacts in the table and render them using the Handlebars 
    // 'contacts' template, sorted ascending by firstName
    app.get("/", function(req, res) {
        console.log("hit / page");
        db.Contact.findAll({
            order: [
                ['lastName', 'ASC'], //DESC would be decending
                ['firstName', 'ASC'],
            ]
        }).then(function(dbContacts) {
            res.render("contacts", {
                name: "Sarah",
                contacts: dbContacts, //the results so its contacts from .then
            });
        }).catch(function(err) {
            console.log(err);
            res.json(err);
        })
    });

    // this route should find all contacts of a particular type (Personal or Business) and render them 
    // using the Handlebars 'contacts' template, sorted ascending by firstName
    app.get("/:type", function(req, res) {
        console.log("hit /:type page");
        var type = req.params.type[0].toUpperCase() + req.params.type.slice(1);
        db.Contact.findAll({
            where: {
                contactType: req.params.type
            },
            order: [
                ['lastName', 'ASC'], //DESC would be decending
                ['firstName', 'ASC'],
            ]
        }).then(function(dbContacts) {
            res.render("contacts", {
                name: "Sarah",
                contacts: dbContacts, //the results so its contacts from .then
                type: type,
            });
        }).catch(function(err) {
            console.log(err);
            res.json(err);
        })

        // BONUS: pass the contact type through to the handlebars template... be sure
        // to make the contact type title-cased!

    });
}