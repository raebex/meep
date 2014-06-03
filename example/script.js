;(function($) {
	'use strict';

	var meep_config = {
		//specify where you want videos to sit
		embed_template: $('#embed-template'),
		sound_list: $('#sound-list'),
		playlist: $('#playlist'),
		search_bar: $('#search-bar'),
		search_button: $('#search-button')
	};

	//initialize soundcloud api
	Meep.init(meep_config);


})(window.jQuery);