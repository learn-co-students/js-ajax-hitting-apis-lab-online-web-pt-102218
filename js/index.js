// your code here


function getRepositories(){
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayRepositories);
    req.open('GET', 'https://api.github.com/users/'+document.getElementById("username").value+'/repos');
    req.send();
}

function displayRepositories() {
    let repos = JSON.parse(this.responseText);
    
    
    let ul = document.createElement('ul')
    document.getElementById('repositories').appendChild(ul)
    repos.forEach((repo)=>{
        
        let li = document.createElement('li')
        let h5 = document.createElement('h5')
        let a = document.createElement('a')
        let a2 = document.createElement('a')
        debugger
        h5.innerHTML = `${repo.name} ${repo.html_url}`
        a.innerHTML = 'get commits'
        a.addEventListener('click',()=>{
            getCommits({dataset:{repository:repo.name,username:repo.owner.login}})
        })
        a2.innerHTML = 'get branches'
        a2.addEventListener('click',()=>{
            getBranches({dataset:{repository:repo.name,username:repo.owner.login}})
        })
        ul.appendChild(li)
        
        li.appendChild(h5)
        li.appendChild(a)
        li.appendChild(a2)
        ul.appendChild(li)
        console.log(li.innerHTML)
    })
}

function getCommits(data){
    
    data = data.dataset
    const req = new XMLHttpRequest();
    req.addEventListener('load',displayCommits)
    req.open('GET',`https://api.github.com/repos/${data.username}/${data.repository}/commits`)
    req.send()
}

function displayCommits(){
    document.getElementById("details").innerHTML=''
    let commits = JSON.parse(this.responseText);
    //console.log(commits)
    let ul = document.createElement('ul')
    //debugger
    
    //console.log(commits[0].commit.committer)
    commits.forEach((commit)=>{
        
        let li = document.createElement('li')
        li.innerHTML=`${commit.commit.committer.name}, ${commit.commit.message} 
        ${commit.author.login}`
        ul.appendChild(li)
    })
    
    document.getElementById("details").appendChild(ul)
}

function getBranches(data){
    data = data.dataset
    const req = new XMLHttpRequest();
    req.addEventListener('load',displayBranches)
    req.open('GET',`https://api.github.com/repos/${data.username}/${data.repository}/branches`)
    req.send()
}

function displayBranches(){
    document.getElementById("details").innerHTML=''
    let branches = JSON.parse(this.responseText);
    let ul = document.createElement('ul');
    //console.log(branches)
    branches.forEach((branch)=>{
        //debugger
        let li = document.createElement('li')
        li.innerHTML = branch.name
        ul.appendChild(li)
    })
    document.getElementById("details").appendChild(ul)
}