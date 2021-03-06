import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import validate from '../../utils/validator/field';

const $ = window.$;

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

  }

  handleChange(event) {
    const that = this;
    validate(event.target, function (field, errors) {
      that.setState({
        errors: errors
      });

    });
  }

  handleBlur(event) {
    const that = this;
    validate(event.target, function (field, errors) {
      that.setState({
        errors: errors
      });
    });
  }

  componentWillReceiveProps(props) {
    if(props.errors){
      if (props.errors.length) {
        this.setState({ errors: props.errors });
      }
    }

  }

  render() {
    const hasErrors = this.state.errors && this.state.errors.length;
    return (
      <div  className={`form-label-group ${ hasErrors ? 'has-danger' : ''}`}>
        <input data-validators={ this.props.validator ? this.props.validator : '' } disabled={ !this.props.disabled ? null : 'disabled' } type={ this.props.type ? this.props.type : 'text' }  className={`form-control ${ hasErrors ? 'form-control-danger' : ''}`} name={ this.props.name ? this.props.name : '' } id={ this.props.name ? this.props.name : '' } placeholder={ this.props.title ? this.props.title : '' } onChange={ this.handleChange } onClick={this.handleFocus}  autoComplete="true" />
        <label htmlFor={this.props.name ? this.props.name : '' } onClick={this.handleFocus} >{this.props.title}</label>
        {hasErrors ? <div className="form-control-feedback">{ this.state.errors[0] }</div> : ''}
      </div>
    );
  }
}
