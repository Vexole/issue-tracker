import React from 'react';
import IssueRow from "./IssueRow.jsx";

export default function IssueTable(props) {
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
