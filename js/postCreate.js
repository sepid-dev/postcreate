const postlist = document.getElementById('postList');
const messageAlert = document.getElementById('message');
const form = document.getElementById('form');
class Post {
    constructor(title, author, body) {
        this.title = title;
        this.author = author;
        this.body = body;
    }
}
class uiPost {
    createPost(post) {
        const divPost = document.createElement('div');
        divPost.className = "col-12 col-md-4 mt-3";
        divPost.innerHTML = `<div class="card mt-4">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <div class="card-subtitle badge text-center">${post.author}</div>
                    <p class="card-text">${post.body}</p>
                    <button class="btn btn-link mt-2 postdelet">delet post</button>
                </div>
            </div>`
        postlist.appendChild(divPost);
    }

    deletvalueAFTER() {
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('body').value = "";
    }

    deletPost(target){
      if(target.classList.contains('postdelet'))  {
          target.parentElement.parentElement.parentElement.remove();
          this.alertShow('the post is deleted successfully', 'danger');
      }

    }
    alertShow(message, alertClass) {
        messageAlert.innerHTML = "";
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${alertClass} col-md-4 text-center`;
        alertDiv.innerHTML = message;
        messageAlert.appendChild(alertDiv);
        setTimeout(function () {
            messageAlert.innerHTML = "";
        }, 3000)
    }
}
class store {
   static getposts() {
        let arrayLocal;
        if (localStorage.getItem('post') === null) {
            arrayLocal = [];
        } else {
            arrayLocal = JSON.parse(localStorage.getItem('post'));
        }
        return arrayLocal;
    }

    static setLOcalPost(post) {
       let arrayLocal=store.getposts();
        arrayLocal.push(post);
        localStorage.setItem('post', JSON.stringify(arrayLocal));
    }

    static addlocalPost() {
        let arrayLocal=store.getposts();
        let uipost=new uiPost();
        arrayLocal.forEach(post => {
            uipost.createPost(post);
        })
    }

    static deletLocalPost(target){
       let header=target.parentElement.firstElementChild;
       let title=header.textContent;
       let posts=JSON.parse(localStorage.getItem('post'));
       posts=posts.filter(post=>post.title!==title);
       localStorage.setItem('post',JSON.stringify(posts))
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const author = document.getElementById('author').value;
    const post = new Post(title, author, body);
    const uipost = new uiPost();
    if (title === '' || author === '' || body === '') {
        uipost.alertShow('the input is empty', 'danger');
    } else {
        store.setLOcalPost(post);
        uipost.createPost(post);
        uipost.deletvalueAFTER();
        uipost.alertShow('the post is created successfully', 'success');
    }

});
postlist.addEventListener('click', function (e) {
    const uipost = new uiPost();
    uipost.deletPost(e.target);
    store.deletLocalPost(e.target);
})
document.addEventListener("DOMContentLoaded", store.addlocalPost);


