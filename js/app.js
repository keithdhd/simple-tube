$(function(){

	$("#search-term").submit(function(event){
		event.preventDefault();
		var searchQuery = $("#query").val().trim();
		getRequest(searchQuery);
	});

});

function getRequest(searchQuery){
	var params = {
		part: 'snippet',
		key: 'AIzaSyDb7nAa4YdgrbkFfP2JJe_TSkS92Pfsp6U',
		q: searchQuery,
		maxResults: 6
	};
	url = "https://www.googleapis.com/youtube/v3/search";

	$.getJSON(url, params, function(data){
		showResults(data.items);
		console.log(data.items);
	});
}

function showResults(_arrData){
	var htmlString = "";
	$.each(_arrData, function(index, value){
		var objSnippet = value.snippet;
		var urlThumb = objSnippet.thumbnails.default.url;
		var videoUrl = "https://www.youtube.com/watch?v=" + value.id.videoId;

		 htmlString += "<li><a href='" + videoUrl + "' target='_blank'><img src='"+ urlThumb +"'><h1>" + objSnippet.title + "</h1></a></li>";
	})

	$("#search-list").html(htmlString);
}