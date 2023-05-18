class Post{
    constructor(id, image, name, description, hashtag, user_id) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.description = description;
        this.hashtag = hashtag;
        this.user_id = user_id;
    }
}

module.exports = Post;