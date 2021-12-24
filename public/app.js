console.log('hello');
document.querySelector('button').addEventListener('click', () => {
    let username = document.querySelector('#username').value;
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: `${username}`
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data.blogs)
        let blog_posts = data.blogs;
        let contain = document.createElement('div');
        document.body.appendChild(contain);
        contain.setAttribute('class', 'contain');

        function display_posts(){
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
                <div class="post-title"><a href="${blog_post.url}" target="_blank" rel="no-referrer">${blog_post.title}</a></div>
                <div class="post-desc">${blog_post.description}<div>
                <div class="date">${blog_post.readable_publish_date}</div>`;
                document.querySelector('.contain').appendChild(post);
            })
        }
        if (document.querySelector('.contain').innerHTML == "") {
            display_posts();
        } else {
            document.querySelector('.contain').innerHTML = "";
            console.log(contain.innerHTML);
            display_posts();
        }
    }).catch((error) => {
        console.log(error)
    })
})