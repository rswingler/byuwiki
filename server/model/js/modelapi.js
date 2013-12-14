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
		}
	}
}