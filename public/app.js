document.querySelector('button').addEventListener('click', () => {
    let username = document.querySelector('#username').value;
    let container = document.querySelector('.contain');
    container.innerHTML = `<div class="loading"><i class="fas fa-spinner"></i></div>`;
    if (username != "") {
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: `${username}`
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data);
            container.innerHTML = "";
            if (data.blogs.length > 0) {
                let blog_posts = data.blogs;

                function display_posts() {
                    document.querySelector('.contain').classList.remove("warn");
                    blog_posts.forEach((blog_post) => {

                        let post = document.createElement('div');
                        post.setAttribute('class', 'post');

                        function image() {
                            if (blog_post.cover_image != null) {
                                return blog_post.cover_image;
                            } else {
                                return blog_post.social_image;
                            }
                        }
                        
                        let post_content = document.createElement('div');
                        post_content.setAttribute('class', 'post-content');

                        //post image
                        let post_image_contain = document.createElement('div');
                        post_image_contain.setAttribute('class', 'post_image_contain');
                        let post_image = document.createElement('img');
                        post_image.setAttribute('loading', 'lazy');
                        post_image.src = image();
                        post_image_contain.appendChild(post_image);
                        post_content.appendChild(post_image_contain);

                        //post title
                        let post_title = document.createElement('div');
                        post_title.setAttribute('class', 'post-title');
                        let post_link = document.createElement('a');
                        post_link.setAttribute('target', '_blank');
                        post_link.setAttribute('rel', 'noreferrer');
                        post_link.setAttribute('href', `${blog_post.url}`);
                        post_link.innerText = blog_post.title;
                        post_title.appendChild(post_link);
                        post_content.appendChild(post_title);

                        //author 
                        let author_name = document.createElement('div');
                        author_name.setAttribute('class', 'author');
                        author_name.innerText = `by ${blog_post.user.name}`;
                        post_content.appendChild(author_name);

                        //post description
                        let post_desc = document.createElement('div');
                        post_desc.setAttribute('class', 'post-desc');
                        post_desc.innerText = blog_post.description;

                        //post meta data
                        let post_meta_data = document.createElement('div');
                        post_meta_data.setAttribute('class', 'post-meta');

                        //post reactions
                        let post_reactions = document.createElement('div');
                        post_reactions.setAttribute('class', 'reactions');

                        let likes = document.createElement('div');
                        likes.setAttribute('class', 'likes');
                        likes.innerHTML = '<i class="far fa-heart"></i>';
                        let no_of_likes = document.createElement('div');
                        no_of_likes.setAttribute('class', 'number_of_likes');
                        no_of_likes.innerText = blog_post.positive_reactions_count;
                        likes.appendChild(no_of_likes);
                        post_reactions.appendChild(likes);

                        let comments = document.createElement('div');
                        comments.setAttribute('class', 'comments');
                        comments.innerHTML = `<i class="far fa-comment"></i>`;
                        let no_of_comments = document.createElement('div');
                        no_of_comments.setAttribute('class', 'number_of_comments');
                        no_of_comments.innerText = blog_post.comments_count;
                        comments.appendChild(no_of_comments);
                        post_reactions.appendChild(comments);

                        //post date
                        let post_date_contain = document.createElement('div');
                        post_date_contain.setAttribute('class', 'post-date-contain');
                        let post_date = document.createElement('div');
                        post_date.setAttribute('class', 'date');
                        post_date.innerText = blog_post.readable_publish_date;
                        post_date_contain.appendChild(post_date);

                        post_meta_data.appendChild(post_date_contain);
                        post_meta_data.appendChild(post_reactions);
                        post_desc.appendChild(post_meta_data);

                        // post_desc.appendChild(post_date_contain);
                        // post_desc.appendChild(post_reactions);
                        post_content.appendChild(post_desc);

                        post.appendChild(post_content);
                        
                        document.querySelector('.contain').appendChild(post);
                    })
                }
                if (document.querySelector('.contain').innerHTML == "") {
                    display_posts();
                } else {
                    document.querySelector('.contain').innerHTML = "";
                    display_posts();
                }
            } else {
                document.querySelector('.contain').classList.add("warn");
                document.querySelector('.contain').innerHTML = `<i class="fas fa-exclamation-circle"></i>There are no blog posts associated with the username "${username}" or the username doesn't exist!`;
            }
        }).catch((error) => {
            console.log(error)
        })
    } else {
        document.querySelector('.contain').classList.add("warn");
        document.querySelector('.contain').innerHTML = `<i class="fas fa-exclamation-circle"></i>Invalid Username`;
    }
})