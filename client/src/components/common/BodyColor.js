import React from 'react';

export default class BodyColor extends React.Component {
  static propTypes = {
    isDark: React.PropTypes.bool
  };
  static defaultProps = {
    isDark: false
  };
  componentDidMount() {
    document.body.classList.toggle('darkClass', this.props.isDark);
  }
  componentWillReceiveProps(nextProps) {
    document.body.classList.toggle('darkClass', nextProps.isDark);
  }
  componentWillUnmount() {
    document.body.classList.remove('darkClass');
  }
  render() {
    return this.props.children;
  }
}
