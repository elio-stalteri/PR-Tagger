import { object_without_properties } from "svelte/internal";

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

const fetchRepoComments = async function (owner, repo, page) {
  const resp = await fetch(
    `${BaseUrl}/repos/${owner}/${repo}/pulls/comments?sort&direction=asc&page=${page}&per_page=100`,
    {
      headers: {
        Authorization: " token " + localStorage.getItem("GithubLogInTocken"),
      },
    }
  );
  const links = getPagesConfig(resp);
  const res = await resp.json();
  return { res, links };
};

export const getAllRepoComments = async function (owner, repo) {
  const firstRes = await fetchRepoComments(owner, repo, 1);
  let current_page = 1;
  let number_of_pages = firstRes.links.last;
  let result = [...firstRes.res];
  if (number_of_pages !== null) {
    while (current_page < number_of_pages) {
      current_page++;
      const nextRes = await fetchRepoComments(owner, repo, current_page);
      result = [...result, ...nextRes.res];
    }
  }
  const aggregatedComments = result.reduce((acc, v) => {
    if (v.diff_hunk in acc) {
      acc[v.diff_hunk].comments.push(v);
    } else {
      acc[v.diff_hunk] = { ...v, comments: [{ user: v.user, body: v.body }] };
    }
    return acc;
  }, {});

  console.log("new request test", Object.values(aggregatedComments));

  return Object.values(aggregatedComments);
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
  const resp = await fetch(
    `${BaseUrl}/orgs/${owner}/repos?page=1&per_page=100`,
    {
      headers: {
        Authorization: " token " + localStorage.getItem("GithubLogInTocken"),
      },
    }
  );
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
