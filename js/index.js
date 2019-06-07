// your code here
const rootURL = 'https://api.github.com';

function getRepositories() {
  let user = document.getElementById('username').value
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories) 
  req.open('GET', `https://api.github.com/users/${user}/repos`);
  req.send();
}

function displayRepositories() {
  
  var repos = JSON.parse(this.responseText); 
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>`
      <li>
      ${r.name}
      <a href="${r.html_url}">${r.html_url}</a><br>
      <a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getBranches(this)"> Display Branches </a> 
      <a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getCommits(this)">Get Commits</a><br>`).join('')}</ul>`;
  
  document.getElementById('repositories').innerHTML = repoList;
}
function getCommits(el) {
  const repo = el.dataset.repository;
  const owner = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${owner}/${repo}/commits`);
  req.send();
}

  function displayCommits () {
    const commits = JSON.parse(this.responseText);
    console.log(commits); 
    const commitsList = `<ul>${commits
      .map(
        commit => `
        <li> 
        ${commit.commit.author.name} 
        ${commit.author.login}
        ${commit.commit.message} 
        </li><br> 

      `).join('')}</ul>`;
      document.getElementById('details').innerHTML = commitsList;
  }
function getBranches(el) {
  const repoName = el.dataset.repository;
  const uri =
    rootURL + '/repos/' + el.dataset.username + '/' + repoName + '/branches';
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayBranches);
  xhr.open('GET', uri);
  xhr.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  console.log(branches); 
  const branchesList = `<ul>${branches
    .map(
      branch => `
      <li> ${branch.name} </li><br> 
    `).join('')}</ul>`;
    document.getElementById('details').innerHTML = branchesList;
}



