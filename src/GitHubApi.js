const BaseUrl = "https://api.github.com";

const linkTypes = ["prev", "next", "last", "first"];

const getPagesConfig = function (resp) {
  const linksHeader = resp.headers.get("link");
  if (linksHeader) {
    let links = linksHeader.split(",");
    links = linkTypes.reduce((acc, linkType) => {
      const pageLink = links.filter(
        (link) => link.indexOf(`rel="${linkType}"`) > -1
      );
      if (pageLink.length > 0) {
        return {
          ...acc,
          [linkType]: parseInt(pageLink[0].split("page=")[1].split(">")[0]),
        };
      }
      return { ...acc, [linkType]: null };
    }, {});
    return links;
  }
  return linkTypes.reduce((acc, linkType) => {
    return { ...acc, [linkType]: null };
  }, {});
};

export const getRepoComments = async function (owner, repo) {
  const resp = await fetch(
    `${BaseUrl}/repos/${owner}/${repo}/pulls/comments?sort&direction=asc&page=1&per_page=100`,
    {
      headers: {
        Authorization: " token " + localStorage.getItem("GithubLogInTocken"),
      },
    }
  );
  const links = getPagesConfig(resp);
  console.log("comments links:", links);
  return await resp.json();
};

export const getRepos = async function (owner) {
  const resp = await fetch(`${BaseUrl}/orgs/${owner}/repos?page=1&per_page=100`, {
    headers: {
      Authorization: " token " + localStorage.getItem("GithubLogInTocken"),
    },
  });
  const links = getPagesConfig(resp);
  console.log("repos links:", links);
  return await resp.json();
};

export const getRepoPRComments = async function (owner, repo, pull_number) {
  const resp = await fetch(
    `${BaseUrl}/repos/${owner}/${repo}/pulls/${pull_number}/comments?sort&direction=asc&page=1&per_page=100`,
    {
      headers: {
        Authorization: " token " + localStorage.getItem("GithubLogInTocken"),
      },
    }
  );
  const links = getPagesConfig(resp);
  console.log("comments links:", links);
  return await resp.json();
};

export const getRepoPRs = async function (owner, repo) {
  const resp = await fetch(
    `${BaseUrl}/repos/${owner}/${repo}/pulls?sort&direction=asc&page=1&per_page=100`,
    {
      headers: {
        Authorization: " token " + localStorage.getItem("GithubLogInTocken"),
      },
    }
  );
  const links = getPagesConfig(resp);
  console.log("comments links:", links);
  return await resp.json();
};

