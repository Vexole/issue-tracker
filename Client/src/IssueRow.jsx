import React from 'react';

export default function IssueRow(props) {
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
