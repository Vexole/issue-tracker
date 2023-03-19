import React from 'react';
import { Route, Routes } from 'react-router-dom';
import IssueList from './IssueList.jsx';
import IssueReport from './IssueReport.jsx';
import { Link } from 'react-router-dom';

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
  return (
    <>
      <div>
        <Link to="/Home">Home | </Link>
        <Link to="/issues">All Issues | </Link>
        <Link to={{ pathname: '/issues/:id' }}>Issue id | </Link>
        <Link to={{ pathname: '/issues', search: '?status=New' }}>
          New Issues |
        </Link>
        <Link to={{ pathname: '/issues', search: '?status=Assigned' }}>
          Assigned Issues |
        </Link>
        <Link to="/report">Report | </Link>
      </div>
      <Routes>
        <Route exact path="/" element={<IssueList />} />
        <Route path="/issues" element={<IssueList />} />
        <Route path="/issues/:id" element={<IssueList />} />
        <Route path="/report" element={<IssueReport />} />
        <Route path="/report" element={<IssueReport />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
    // <Switch>
    //   <Redirect exact from="/" to="/issues" />
    //   <Route path="/issues" component={IssueList} />
    //   <Route path="/report" component={IssueReport} />
    //   <Route component={NotFound} />
    // </Switch>
  );
}
