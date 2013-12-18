// All functions that the controller can call to interract with the model should go in here

exports.init = function(db) {
	return {
		/**
		 * Inserts a new page into the database with no html content.
		 *
		 * pageName (String): The name of the page to be inserted. Words should be separated by
		 * 		spaces, not underscores.
		 */
		createPage: function(pageName) {
			var collection = db.get('articles');
			collection.insert({
				'created': Date.now(),
				'categoryIds': [],
				'categoryNames': [],
				'wikiTitle': pageName,
				'html': '',
				'markup': ''
			});
		},
		/**
		 * Queries the database and returns the page requested.
		 *
		 * pageName (String): The name of the page to be retrieved. Words should be separated by
		 *		spaces, not underscores.
		 * callback (function(page)): A function that accepts a page or null object, depending
		 *		on whether the page is found in the database
		 */
		findPage: function(pageName, callback) {
			var collection = db.get('articles');

			safeFind(collection, {'wikiTitle': pageName}, function(results) {
				callback(results[0] || null)
			});
		},

		setPageContent: function(pageName, html, markup) {
			var collection = db.get('articles');

			safeFind(collection, {'wikiTitle': pageName}, function(results) {
				var page = results[0] || null;
				if (page) {
					page.html = html || page.html;
					page.markup = markup || page.markup;

					collection.update(page._id, page);
				}
				else {
					throw "Could not find document " + pageName + " in articles.";
				}
			});
		},

		getPageContent: function(pageName, callback) {
			var collection = db.get('articles');

			safeFind(collection, {'wikiTitle': pageName}, function(results) {
				var page = results[0] || null;
				if (page) {
					callback({
						'html': page.html,
						'markup': page.markup
					});
				}
				else {
					throw "Could not find document " + pageName + " in articles.";
				}
			})
		},

		findAllPages: function(callback) {
			var collection = db.get('articles');

			safeFind(collection, {}, callback);
		}
	}
}

var safeFind = function(collection, criteria, callback) {
    collection.find(criteria, function(e, docs) {
        if (e) throw e;
        callback(docs);
    });
};