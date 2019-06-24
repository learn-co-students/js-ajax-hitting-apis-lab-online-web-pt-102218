// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.getElementById("username").value;
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  console.log(this.responseText);
  const repoList = `<ul>${repos
    .map(
      r => 
        '<li>' +
        `<a href="${r.html_url}">` +
        r.name +
        '</a> - <a href="#" data-repository="' +
        r.name +
        '" data-username="' +
        r.owner.login +
        '" onclick="getCommits(this)">Get Commits</a>' +
        ' - <a href="#" data-repository="' +
        r.name +
        '" data-username="' +
        r.owner.login +
        '" onclick="getBranches(this)">Get Branches</a></li>'
    )
    .join('')}</ul>`
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const repo = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  console.log(`https://api.github.com/repos/${username}/${repo}/commits`)
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${username}/${repo}/commits`);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(this.responseText);
  const commitList = `<ul>${commits
    .map(
      c =>
        '<li><strong>' +
        c.author.login +
        ' (' +
        c.commit.author.name +
        ')</strong> - ' +
        c.commit.message +
        '</li>'
    )
    .join('')}</ul>`
  document.getElementById('details').innerHTML = commitList
}

function getBranches(el) {
  const repo = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  console.log(`https://api.github.com/repos/${username}/${repo}/branches`)
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username}/${repo}/branches`);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  console.log(this.responseText);
  const branchList = `<ul>${branches
    .map(
      b =>
        '<li>' +
        b.name +
        '</li>'
    )
    .join('')}</ul>`
  document.getElementById('details').innerHTML = branchList
}