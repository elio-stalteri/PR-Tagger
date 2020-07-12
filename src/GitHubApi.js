const BaseUrl = "https://api.github.com"

export const getRepoComments = async function (owner, repo) {
  const resp = await fetch(
    `${BaseUrl}/repos/${owner}/${repo}/pulls/comments?sort&direction=asc`,
    {
      headers: {
        Authorization: " token " + localStorage.getItem("GithubLogInTocken"),
      },
    }
  );
  return await resp.json();

};


export const getRepos = async function (owner) {
  const resp = await fetch(`${BaseUrl}/orgs/${owner}/repos`, {
    headers: {
      Authorization: " token " + localStorage.getItem("GithubLogInTocken"),
    },
  });
  return await resp.json();
};

