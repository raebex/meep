
//how outside world is going to know where our sandbox is, must be unique to the page, semi-public!
var Meep = (function($){
	'use strict';

	// initialize client with app credentials
	SC.initialize({
	  client_id: '83ecf5e2db8876a9daf84855c40b931c'
	});

	//references to lists about to be populated
	var $sound_list;
	var $playlist;
	var _embed_template;
	var $search_bar;
	var $search_button;

	//store current id
	var current;

	//store user input from search bar
	//default is pizza
	var result = 'pizza';

	

	//event listeners
	var _setup_event_listener = function(){
		//add to playlist
		$sound_list.on('click', '.add', function(e){
			e.preventDefault();

			//append selected track to playlist
			//grandparent of the add button
			$playlist.append($(this).parent().parent());

			//change add button to delete button
			$(this).text('Delete');			
		});

		//delete from playlist
		$playlist.on('click', '.add', function(e){
				e.preventDefault();
				$sound_list.prepend($(this).parent().parent());
				$(this).text('Add');
		});

		//play track
		$sound_list.on('click', '.play', function(e){
			e.preventDefault();
			current = $(this);
			Meep.play_track();
		});	

		$playlist.on('click', '.play', function(e){
			e.preventDefault();
			current = $(this);
			Meep.play_track();
		});		

		//stop track
		$sound_list.on('click', '.stop', function(e){
			e.preventDefault();
			current = $(this);
			Meep.stop_track();
		});	

		$playlist.on('click', '.stop', function(e){
			e.preventDefault();
			current = $(this);
			Meep.stop_track();
		});	  

		//search bar
		$search_button.on('click', function(e){
			e.preventDefault();
			$sound_list.empty();
			result = $search_bar.val();
			Meep.list_tracks();
		});
	};

	//sandbox will return something; door into sandbox;
	return {
		//objects
		init: function(config){
            //store the user supplied config value in Oemiv's private variable
			_embed_template = $('#embed-template');
            $sound_list = config.sound_list;
            $playlist = config.playlist;
            $search_bar = config.search_bar;
            $search_button = config.search_button;

			//list tracks
    		Meep.list_tracks();

    		//call private functions
    		_setup_event_listener();

		},

		list_tracks: function(track){
			//get 'result' from search bar input
			SC.get('/tracks', { q: result }, function(tracks){
				
				$(tracks).each(function(index, track) {
					//variables  for template
					var embed_template = _.template(_embed_template.html());
					var embed_values;
					var embed_markup;
					
					//store values from soundcloud tracks 	
					embed_values = {
						title: track.title,
						image: track.artwork_url,
						id: track.id
					}

					//embed values into markup
					embed_markup = embed_template(embed_values);

					//append markup to sound list
					$sound_list.append(embed_markup);
					
				});
			});
		},

		play_track: function(track){
			//turn background yellow
			current.parent().parent().addClass('now-playing');

			var playNextSound = current.next().attr('id');

			SC.stream('/tracks/' + current.attr('id'), function(sound){
				//start stream
				sound.start();
			});	    
		},

		stop_track: function(track){	
			//turn background white	
			current.parent().parent().removeClass('now-playing');

			//stop all streams
			soundManager.stopAll();
		},
		
	};
})(window.jQuery); 
