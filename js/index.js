function getRepositories(user) {
    const username = document.getElementById('username' || user).value;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayRepositories);
    req.open('GET', `https://api.github.com/users/${username}/repos`)
    req.send();
}

function displayRepositories() {
    const response = JSON.parse(this.responseText);
    const repoList = `<ul>${response.map(r => '<li><a href="' + r.html_url + '">' + r.name + '</a>' + '</li>' + '-' + '<a href="' + r.branch_url + '" onClick="getBranches(this);">Branches</a>').join('')}</ul>`
    document.getElementById('repositories').innerHTML = repoList
}

function getCommits(el) {
  console.log(el)
    const repo = el.dataset.repository
    const user = el.dataset.username
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', `https://api.github.com/repos/${user}/${repo}/commits`)
    req.send();
}

function displayCommits() {
    const response = JSON.parse(this.responseText);
    const repoList = `<ul>${response.map(r => r.author.login + '-' + r.commit.committer.name + '-' + r.commit.message).join('')}</ul>`
    document.getElementById('details').innerHTML = repoList
}


function getBranches(el) {
  const repo = el.dataset.repository 
  const user = el.dataset.username 
  const req = new XMLHttpRequest() 
  req.addEventListener('load', displayBranches)
  req.open('GET', `https://api.github.com/repos/${user}/${repo}/branches`)
  req.send()
}

function displayBranches() {
   const response = JSON.parse(this.responseText)
    console.log(response)
    const branchList = `<ul> ${response.map(r => '<li>'+ r.name +'</li>').join('')}</ul>`
    document.getElementById('details').innerHTML = branchList
}

