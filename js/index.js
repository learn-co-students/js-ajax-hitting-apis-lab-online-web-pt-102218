// your code here
function getRepositories() {
  let user = document.getElementById('username').value
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories) 
  req.open('GET', `https://api.github.com/users/${user}/repos`);
  req.send();
}

function displayRepositories() {
  debugger
  var repos = JSON.parse(this.responseText); 
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}
function getCommits() {
  
}