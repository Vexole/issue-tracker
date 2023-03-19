import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import Page from './Page.jsx';

const element = (
  <Router>
    <Page />
  </Router>
);

const root = createRoot(document.getElementById('contents'));
root.render(element);

// ReactDOM.render(element, document.getElementById('contents'));

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
