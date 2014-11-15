$.InfiniteTweet = function (el, options) {
    this.$el = $(el);
    this.$el.find('a.fetch-more').on('click', this.fetchTweets.bind(this));
    this.maxCreatedAt = null;
};

$.InfiniteTweet.prototype.fetchTweets = function (event) {
    event.preventDefault();
    $.ajax({
        url: '../feed',
        type: "get",
        dataType: "json",
        data: this.maxCreatedAt,
        success: this.insertTweets.bind(this)
    })
}

$.InfiniteTweet.prototype.insertTweets = function (response) {
    var $feed = this.$el.find('ul#feed');
    $(response).each(function (i, el) {
        var tweet = $('<li>').text(JSON.stringify(el.content));
        $feed.append(tweet);
    })
    
}

$(function () {
    $("div.infinite-tweets").infiniteTweet();
});

$.fn.infiniteTweet = function () {
    return this.each(function () {
        new $.InfiniteTweet(this);
    });
};