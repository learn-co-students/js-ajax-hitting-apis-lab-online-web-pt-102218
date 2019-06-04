const baseUrl = 'https://api.github.com'

function getRepositories() {
  networkRequest(
    `${baseUrl}/users/${document.getElementById('username').value}/repos`,
    displayRepositories
  )
}

function getCommits(el) {
  networkRequest(
    `${baseUrl}/repos/${el.dataset.username}/${el.dataset.repository}/commits`,
    displayCommits
  )
}

function getBranches(el) {
  networkRequest(
    `${baseUrl}/repos/${el.dataset.username}/${el.dataset.repository}/branches`,
    displayBranches
  )
}

function networkRequest(url, callback) {
  const req = new XMLHttpRequest();
  req.addEventListener('load', callback);
  req.open('GET', url);
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const reposHtml = `<ul>${
    repos.map(r =>
      `<li>
        <a href="${r.html_url}">${r.owner.login}/${r.name}</a>
        <a href="#" onclick="getCommits({dataset: {username: '${r.owner.login}', repostory: '${r.name}'}})">Commits</a>
        <a href="#" onclick="getBranches({dataset: {username: '${r.owner.login}', repostory: '${r.name}'}})">Branches</a>
      </li>`
    ).join('')
  }</ul>`;
  document.getElementById('repositories').innerHTML = reposHtml;
}

function displayCommits() {
  console.log(JSON.parse(this.responseText)[0].url.split('/')[4])
  const commits = JSON.parse(this.responseText);
  const commitsHtml = `<ul>${commits[0].url.split('/')[4]} ${
    commits.map(r =>
      `<li>
        ${r.commit.author.name},
        ${r.commit.committer.name},
        ${r.commit.message},
      </li>`
    ).join('')
  }</ul>`;
  document.getElementById('details').innerHTML = commitsHtml;

}

function displayBranches() {
  const branch = JSON.parse(this.responseText);
  const branchHtml = `<ul>${
    branch.map(r => `<li>${r.name}</li>`).join('')
  }</ul>`;
  document.getElementById('details').innerHTML = branchHtml;

}
