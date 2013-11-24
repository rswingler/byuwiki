exports.pageOne = function(db) 
{
    return function(req, res) 
    {
        var collection = db.get('content_html');
        collection.find({},{},function(e,docs)
	{
            //var md = require("markdown-js").Markdown;
            res.render('template_pageOne', {
                "template_pageOne" : docs
            });
        });
    };
};

exports.pageTwo = function(db) 
{
    return function(req, res) 
    {
        var collection = db.get('content_html');
        collection.find({},{},function(e,docs)
	{
            //var md = require("markdown-js").Markdown;
            res.render('template_pageTwo', {
                "template_pageTwo" : docs
            });
        });
    };
};

exports.write = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var dateCreated = req.body.dateCreated;
        var categoryId = req.body.catID;
	var categoryName = req.body.catName;
        var articleName = req.body.articleName;
	var html = req.body.myHtml;

        // Set our collection
        var collection = db.get('content_html');

        // Submit to the DB
        collection.insert({
            "created" : dateCreated,
            "categoryId" : categoryId,
            "categoryName" : categoryName,
	    "wikiName" : articleName,
	    "html" : html
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
		//set the header so the address bar doesn't still say /adduser
                res.location("/two");
                // If it worked, forward to success page
                res.redirect("/two");
                
            }
        });

    }
};
