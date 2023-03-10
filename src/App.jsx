import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);
    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

const IssueFilter = (props) => {
  return <h1>Issue Filter Component</h1>;
};

const IssueRow = (props) => {
  const { id, title, status, owner, created, effort, due } = props.issue;
  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{status}</td>
      <td>{owner}</td>
      <td>{created.toDateString()}</td>
      <td>{effort}</td>
      <td>{due ? due.toDateString() : ''}</td>
    </tr>
  );
};

const IssueTable = (props) => {
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        {props.issues.map((issue) => (
          <IssueRow issue={issue} key={issue.id} />
        ))}
      </tbody>
    </table>
  );
};

const IssueAdd = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const issue = {
      owner: form.owner.value,
      title: form.title.value,
    };
    props.createIssue(issue);
    form.owner.value = '';
    form.title.value = '';
  };

  return (
    <form name="issueAdd" onSubmit={handleSubmit}>
      <input type="text" name="owner" placeholder="Owner" />
      <input type="text" name="title" placeholder="Title" />
      <button>Add</button>
    </form>
  );
};

const IssueList = (props) => {
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

const element = <IssueList />;
ReactDOM.render(element, document.getElementById('contents'));

// class IssueAdd extends React.Component {
//   constructor() {
//     super();
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     const form = document.forms.issueAdd;
//     const issue = {
//       owner: form.owner.value,
//       title: form.title.value,
//       status: 'New',
//     };
//     this.props.createIssue(issue);
//     form.owner.value = '';
//     form.title.value = '';
//   }

//   render() {
//     return (
//       <form name="issueAdd" onSubmit={this.handleSubmit}>
//         <input type="text" name="owner" placeholder="Owner" />
//         <input type="text" name="title" placeholder="Title" />
//         <button>Add</button>
//       </form>
//     );
//   }
// }

// class IssueList extends React.Component {
//   constructor() {
//     super();
//     this.state = { issues: [] };
//   }

//   componentDidMount() {
//     this.loadData();
//   }

//   loadData() {
//     setTimeout(() => {
//       this.setState({ issues: initialIssues });
//     }, 500);
//   }

//   createIssue(issue) {
//     issue.id = this.state.issues.length + 1;
//     issue.created = new Date();
//     this.setState({ issues: [...this.state.issues, issue] });
//   }

//   render() {
//     return (
//       <>
//         <IssueFilter />
//         <IssueTable issues={this.state.issues} />
//         <IssueAdd createIssue={this.createIssue.bind(this)} />
//       </>
//     );
//   }
// }
