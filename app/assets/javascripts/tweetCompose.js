$.TweetCompose = function (el) {
    this.$el = $(el);
    this.$el.on('submit', this.submitForm.bind(this));
    this.$el.find('textarea').on('input', function(event) {
        var remaining = 140 - $(event.currentTarget).val().length;
        this.$el.find('strong').text(remaining);
    }.bind(this));
    this.$el.find('a.add-mentioned-user').on('click', this.addMentionedUser.bind(this))
    this.$el.on('click', 'a.remove-mentioned-user', this.removeMentionedUser.bind(this))
};

$.TweetCompose.prototype.submitForm = function (event) {
    event.preventDefault();
    var formData = this.$el.serialize();
    this.$el.find(':input').prop('disabled', true);
    $.ajax({
        url: "../tweets",
        type: "POST",
        data: formData,
        dataType: "json",
        success: this.handleSuccess.bind(this)
    });
};

$.TweetCompose.prototype.clearInput = function () {
    this.$el.find('textarea').val('');
    this.$el.find('.mentioned-users').empty();   
};

$.TweetCompose.prototype.handleSuccess = function (response) {
    this.clearInput();
    this.$el.find(':input').prop('disabled', false);
    var newTweet = $('<li>').text(JSON.stringify(response.content));
    $(this.$el.data('tweets-ul')).prepend(newTweet);
};

$.TweetCompose.prototype.addMentionedUser = function (event) {
    $scriptTagHTML = $(this.$el.find('script').html());
    $scriptTagHTML.appendTo(this.$el.find('.mentioned-users'));
}

$.TweetCompose.prototype.removeMentionedUser = function (event) {
    $(event.currentTarget).parent().remove();
}

$(function () {
    $("form.tweet-compose").tweetCompose();
});

$.fn.tweetCompose = function () {
    return this.each(function () {
        new $.TweetCompose(this);
    });
};