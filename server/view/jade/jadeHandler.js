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
