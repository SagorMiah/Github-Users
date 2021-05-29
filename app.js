const username = document.querySelector('#username')
const info = document.querySelector('.info')
const showuser = document.querySelector('.apply')
const repos = document.querySelector('.repos')

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    gituUser(username.value)
})

const gituUser = (user) => {
    fetch('https://api.github.com/users/'+user)
    .then(res => {
        if(res.ok){
            return res.json()
        }else{
            info.innerHTML = "Something went wrong!"
        }
    })
    .then(data => {
        showuser.innerHTML = `
             <div>
                 <h1>${data.name}</h1>
                 <p>${data.bio}</p>
                 <ul>
                   <li>${data.followers} Followers</li>
                   <li>${data.following} Following</li>
                   <li>${data.public_repos} Repositories</li>
                 </ul>
             </div>
             <div class="gitImg">
                 <img src="${data.avatar_url}"/>
             </div>
        `
    })
    username.value = ''
    userRepos(user)
}

const userRepos = (user) => {
    fetch('https://api.github.com/users/'+user+'/repos')
    .then(res => {
        if(res.ok){
            return res.json()
        }else{
            info.innerHTML = "Something went wrong! :) <br/> Maybe you have given wrong username!"
        }
    })
    .then(data => {
        for(let i = 0; i < data.length; i++){
            repos.innerHTML += `<a target="_blank" href="${data[i].html_url}">${data[i].name}</a>`
        }
    })
}