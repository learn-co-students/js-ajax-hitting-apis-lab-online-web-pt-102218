function getRepositories() {
  let req = new XMLHttpRequest();
  let username = document.getElementById('username').value
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function getCommits() {

}

function getBranches() {


}
function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  let reposHtml = `<ul>${repos.map(r =>
    `<li><a href="${r.html_url}">${r.owner.login}/${r.name}</a></li>`
  ).join('')}</ul>`;
  document.getElementById('repositories').innerHTML = reposHtml;
}

function displayCommits() {

}

function displayBranches() {

}
