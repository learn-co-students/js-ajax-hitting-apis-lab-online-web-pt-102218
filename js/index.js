// your code here
function getRepositories(){
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayRepositories);
    req.open('GET', 'https://api.github.com/users/octocat/repos');
    req.send();
}

function displayRepositories() {
    let repos = JSON.parse(this.responseText);
    // console.log(repos);
    
    const repoList = `<ul>${repos
      .map(
        r =>
          '<li>' +
          `<a href="https://github.com/${r.owner.login}/${r.name}">` + 
          r.owner.login + " " + r.name + 
          "</a>" + 
          // ' - <a href="#" data-repo="' +
          // r.name +
          // '" onclick="getCommits(this)">Get Commits</a></li>' +
          // ' - <a href="#" data-repo="' +
          // r.name +
          // '" onclick="getBranches(this)">Get Branches</a></li>' 
          '</li>'
      )
      .join('')}</ul>`;
    document.getElementById('repositories').innerHTML = repoList;
  }

  function getCommits(el) {
    // console.log(el)
    const repo = el.dataset.repository;
    const username = el.dataset.username
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', 'https://api.github.com/repos/' +  username + '/' + repo + '/commits');
    req.send();
  }

  function displayCommits() {
    const commits = JSON.parse(this.responseText);
    // console.log(commits)
    const commitsList = `<ul>${commits
      .map(
        commit =>
          '<li><strong>' +
          commit.author.login +
          '<strong>' +
          commit.commit.author.name +
          '</strong> - ' +
          commit.commit.message +
          '</li>'
      )
      .join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
  }

  function getBranches(el){
    console.log(el)
    const repo = el.dataset.repository
    const username = el.dataset.username
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayBranches);
    req.open('GET', 'https://api.github.com/repos/' + username + '/' + repo + '/branches');
    req.send();

    // const name = el.dataset.repo;
    // const req = new XMLHttpRequest();
    
    // req.open('GET', 'https://api.github.com/repos/octocatpytho/' + name + '/commits');
    // req.send();
  }
  function displayBranches(){
    const branches = JSON.parse(this.responseText);
    // console.log("INSIDE DISPLAY BRANCHES FUNCTION!")
    // console.log(branches)
    const branchesList = `<ul>${branches
      .map(
        branch =>
          '<li><strong>' +
          branch.name +
          // '<strong>' +
          // commit.commit.author.name +
          // '</strong> - ' +
          // commit.commit.message +
          '</li>'
      )
      .join('')}</ul>`;
    document.getElementById('details').innerHTML = branchesList;
  }