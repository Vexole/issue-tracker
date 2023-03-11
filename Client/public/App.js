const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}
async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
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
const IssueFilter = props => {
  return /*#__PURE__*/React.createElement("h1", null, "Issue Filter Component");
};
const IssueRow = props => {
  const {
    id,
    title,
    status,
    owner,
    created,
    effort,
    due
  } = props.issue;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, id), /*#__PURE__*/React.createElement("td", null, title), /*#__PURE__*/React.createElement("td", null, status), /*#__PURE__*/React.createElement("td", null, owner), /*#__PURE__*/React.createElement("td", null, created.toDateString()), /*#__PURE__*/React.createElement("td", null, effort), /*#__PURE__*/React.createElement("td", null, due ? due.toDateString() : ''));
};
const IssueTable = props => {
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Created"), /*#__PURE__*/React.createElement("th", null, "Effort"), /*#__PURE__*/React.createElement("th", null, "Due Date"))), /*#__PURE__*/React.createElement("tbody", null, props.issues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {
    issue: issue,
    key: issue.id
  }))));
};
const IssueAdd = props => {
  const handleSubmit = e => {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const issue = {
      owner: form.owner.value,
      title: form.title.value
    };
    props.createIssue(issue);
    form.owner.value = '';
    form.title.value = '';
  };
  return /*#__PURE__*/React.createElement("form", {
    name: "issueAdd",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "owner",
    placeholder: "Owner"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "title",
    placeholder: "Title"
  }), /*#__PURE__*/React.createElement("button", null, "Add"));
};
const IssueList = props => {
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
  const createIssue = async issue => {
    issue.due = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10).toISOString();
    const query = `mutation AddIssue($issue: IssueInputs!) {
      addIssue(issue: $issue) {
        id
      }
    }`;
    const data = await graphQLFetch(query, {
      issue
    });
    if (data) {
      loadData();
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement(IssueTable, {
    issues: issues
  }), /*#__PURE__*/React.createElement(IssueAdd, {
    createIssue: createIssue
  }));
};
const element = /*#__PURE__*/React.createElement(IssueList, null);
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