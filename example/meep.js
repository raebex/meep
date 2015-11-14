var Meep = (function($){
  'use strict';

  SC.initialize({
    client_id: '{83ecf5e2db8876a9daf84855c40b931c}'
  });

  var $sound_list;
  var $playlist;
  var _embed_template;
  var $search_bar;
  var $search_button;
  var current;

  var result = 'pizza';

  var _setup_event_listener = function(){
    $sound_list.on('click', '.add', function(e){
      e.preventDefault();
      $playlist.append($(this).parent().parent());
      $(this).text('Delete');     
    });

    $playlist.on('click', '.add', function(e){
        e.preventDefault();
        $sound_list.prepend($(this).parent().parent());
        $(this).text('Add');
    });

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

    $search_button.on('click', function(e){
      e.preventDefault();
      $sound_list.empty();
      result = $search_bar.val();
      Meep.list_tracks();
    });
  };

  return {
    //objects
    init: function(config){
      _embed_template = $('#embed-template');
        $sound_list = config.sound_list;
        $playlist = config.playlist;
        $search_bar = config.search_bar;
        $search_button = config.search_button;

      Meep.list_tracks();
      _setup_event_listener();

    },

    list_tracks: function(track){
      SC.get('/tracks', { q: result }, function(tracks){
        $(tracks).each(function(index, track) {
          var embed_template = _.template(_embed_template.html());
          var embed_values;
          var embed_markup;
           
          embed_values = {
            title: track.title,
            image: track.artwork_url,
            id: track.id
          }

          embed_markup = embed_template(embed_values);
          $sound_list.append(embed_markup);
          
        });
      });
    },

    play_track: function(track){
      current.parent().parent().addClass('now-playing');
      var playNextSound = current.next().attr('id');
      SC.stream('/tracks/' + current.attr('id'), function(sound){
        sound.start();
      });     
    },

    stop_track: function(track){  
      current.parent().parent().removeClass('now-playing');
      soundManager.stopAll();
    }, 
  };
})(window.jQuery); 
