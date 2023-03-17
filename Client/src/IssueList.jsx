import React from 'react';
import graphQLFetch from './graphQLFetch.js';
import IssueFilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';

export default function IssueList(props) {
  const [issues, setIssues] = React.useState([]);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const query = `query {
          issueList {
            id title status owner
          created effort due
          }
        }`;

    const data = await graphQLFetch(query);
    if (data) {
      setIssues(data.issueList);
    }
  };

  const createIssue = async (issue) => {
    issue.due = new Date(
      new Date().getTime() + 1000 * 60 * 60 * 24 * 10
    ).toISOString();

    const query = `mutation AddIssue($issue: IssueInputs!) {
        addIssue(issue: $issue) {
          id
        }
      }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
      loadData();
    }
  };

  return (
    <>
      <IssueFilter />
      <IssueTable issues={issues} />
      <IssueAdd createIssue={createIssue} />
    </>
  );
};
