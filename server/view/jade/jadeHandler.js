exports.init = function(db) {
    return {
        pageOne: function(req, res) {
            var collection = db.get('articles');
            safeFind(collection, {},function(docs) {
                render(res, 'template_pageOne', {'template_pageOne': docs});
            });
        },
        pageTwo: function(req, res) {
            var collection = db.get('articles');
            safeFind(collection, {},function(docs) {
                render(res, 'template_pageTwo', {'template_pageTwo': docs});
            });
        },
        write: function(req, res) {
            // Get our form values. These rely on the "name" attributes
            var dateCreated = req.body.dateCreated;
            var categoryId = req.body.catID;
            var categoryName = req.body.catName;
            var articleName = req.body.articleName;
            var html = req.body.myHtml;

            // Set our collection
            var collection = db.get('articles');

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
                }
            );
        },

        /**
         * Attempts to retrieve the wiki data for the requested page
         */
        showWikiPage: function(req, res) {
            var pagename = req.params.page || '';
            var title = pagename.replace("_", " ");

            var collection = db.get('articles');

            safeFind(collection, {wikiTitle: title}, function(results) {
                var data = results[0] || null;
                if (data) {
                    render(res, 'contentPage', {'urlTitle': pagename, 'title': title, 'content': data.html, 'isArticle': true});
                }
                else {
                    res.status(404).send('<h1>404 Not Found</h1><p>Unable to find wiki page <b>' + pagename + '</b>.</p>');
                }
            });
        },

        /**
         * Attempts to retrieve the wiki data for the requested page for editing
         */
        editWikiPage: function(req, res) {
            var pagename = req.params.page || '';
            var title = pagename.replace("_", " ");

            var collection = db.get('articles');

            safeFind(collection, {wikiTitle: title}, function(results) {
                var data = results[0] || null;
                if (data) {
                    render(res, 'editPage', {'urlTitle': pagename, 'title': title, 'isArticle': true, 'categories': data.catagoryNames || []});
                }
                else {
                    res.status(404).send('<h1>404 Not Found</h1><p>Unable to find wiki page <b>' + pagename + '</b>.</p>');
                }
            });
        }
    };
};

var safeFind = function(collection, criteria, callback) {
    collection.find(criteria, function(e, docs) {
        if (e) throw e;
        callback(docs);
    });
};

var render = function(res, title, variables) {
    variables = variables || {};

    res.render(title, variables);
};