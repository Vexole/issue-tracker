import React from 'react';

export default function IssueAdd(props){
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
