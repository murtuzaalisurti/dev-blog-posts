document.querySelector('button').addEventListener('click', () => {
    let username = document.querySelector('#username').value;
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
            if (data.blogs.length > 0) {
                let blog_posts = data.blogs;

                function display_posts() {
                    document.querySelector('.contain').classList.remove("warn");
                    blog_posts.forEach((blog_post) => {
                        function image() {
                            if (blog_post.cover_image != null) {
                                return `<img src="${blog_post.cover_image}" />`;
                            } else {
                                return `<img src="${blog_post.social_image}" />`;
                            }
                        }
                        let post = document.createElement('div');
                        post.setAttribute('class', 'post');
                        post.innerHTML = `<div class="post_image_contain">${image()}</div>
                <div class="post-title"><a href="${blog_post.url}" target="_blank" rel="noreferrer">${blog_post.title}</a></div>
                <div class="post-desc">${blog_post.description}<div>
                <div class="date">${blog_post.readable_publish_date}</div>`;
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