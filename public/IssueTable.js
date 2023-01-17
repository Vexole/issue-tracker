class IssueTable extends React.Component {
  render() {
    const issues = [{
      id: 1,
      status: 'New',
      owner: 'Ravan',
      effort: 5,
      created: new Date('2018-08-15'),
      due: undefined,
      title: 'Error in console when clicking Add'
    }, {
      id: 2,
      status: 'Assigned',
      owner: 'Eddie',
      effort: 14,
      created: new Date('2018-08-16'),
      due: new Date('2018-08-30'),
      title: 'Missing bottom border on panel'
    }];
    return /*#__PURE__*/React.createElement("table", {
      className: "bordered-table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Created"), /*#__PURE__*/React.createElement("th", null, "Effort"), /*#__PURE__*/React.createElement("th", null, "Due Date"))), /*#__PURE__*/React.createElement("tbody", null, issues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {
      issue: issue,
      key: issue.id
    }))));
  }
}
export default IssueTable;