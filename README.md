meep
====

Search from SoundCloud's massive collection of sounds and compile them into a custom playlist

###Getting started

1) Include jquery, underscore, soundcloud sdk, and meep.js in html at the end of your body tag
```
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js"></script>
<script src="http://connect.soundcloud.com/sdk.js"></script>
<script src="your-path-to/meep.js"></script>
<script src="your-path-to/script.js"></script>
```

2) The HTML structure is up to you, as long as you have tags for a search bar, search button, and two list tags: one for SoundCloud's tracks, and one for the custom playlist. The ids are also up to you. For example: 
```
<html>
  <head></head>
  <body>
    <input type="text" id="search-bar">
    <button type="submit" id="search-button">Search</button>
    <ul id="sound-list"></ul>
    <ul id="playlist"></ul>
  </body>
</html>
```

3) Copy past this underscore template above the rest of the script tags:
```
<script type="text/template" id="embed-template">
  <li class="track">
    <img src="<%=image%>"/>
    <div>
      <%=title%>
      <a href="#" id="<%=id%>" class="play">Play</a>
      <a href="#" id="<%=id%>" class="stop">Stop</a>
      <a href="#" class="add">Add</a>
    </div>
  </li>
</script>
```

4) In your custom script file, copy/paste this snippet and fill in the parameters with your own id tags from your html file. For example:
```
var meep_config = {
  //specify where you want videos to sit
  embed_template: $('#embed-template'),
  sound_list: $('#sound-list'),
  playlist: $('#playlist'),
  search_bar: $('#search-bar'),
  search_button: $('#search-button')
};
```

###The meep playlist is now incorporated into your project!

The following code snippets are optional, but will help you out with styling and such.

6) Right now, the default search keyword for the listed tracks is 'pizza.' To change or delete this, go to line 23 in meep.js and delete or modify the result variable:
```
//default
var result = 'pizza';

//modified so no tracks will appear until user enters something into the search bar:
var result = '';

//or, set your own default:
var result = 'rock';
```
