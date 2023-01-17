import IssueFilter from './IssueFilter';
import IssueTable from './IssueTable';
import IssueAdd from './IssueAdd';
class IssueList extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement(IssueTable, null), /*#__PURE__*/React.createElement(IssueAdd, null));
  }
}
export default IssueList;