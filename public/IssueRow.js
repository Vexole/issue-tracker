class IssueRow extends React.Component {
  render() {
    const {
      id,
      title,
      status,
      owner,
      created,
      effort,
      due
    } = this.props.issue;
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, id), /*#__PURE__*/React.createElement("td", null, title), /*#__PURE__*/React.createElement("td", null, status), /*#__PURE__*/React.createElement("td", null, owner), /*#__PURE__*/React.createElement("td", null, created.toDateString()), /*#__PURE__*/React.createElement("td", null, effort), /*#__PURE__*/React.createElement("td", null, due ? due.toDateString() : ''));
  }
}
export default IssueRow;