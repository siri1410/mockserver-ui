import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, FieldArray, formValueSelector, reduxForm} from 'redux-form';
import {AutoComplete as MUIAutoComplete, IconButton, FloatingActionButton} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import PropTypes from "prop-types";
import {AutoComplete, TextField, Toggle,} from 'redux-form-material-ui';

class Form extends Component {
    static propTypes = {
        host: PropTypes.string.isRequired,
        port: PropTypes.string.isRequired,
        connectSocket: PropTypes.func.isRequired,
        sendMessage: PropTypes.func.isRequired,
        disconnectSocket: PropTypes.func.isRequired
    };

    renderValues = (disabled) => ({fields}) => {
        return (
            <div style={{
                width: "50%",
                padding: "5px",
                paddingRight: "10px",
                display: "inline-block",
                verticalAlign: "bottom",
            }}>
                {fields.map((field, index) => <div key={index} style={{
                    display: "inline-block",
                    width: "70%",
                }}>

                    <Field
                        disabled={disabled}
                        fullWidth={true}
                        style={{
                            width: "80%",
                        }}
                        name={field}
                        component={TextField}
                        hintText="Value"
                        onChange={(e) => {console.log(e)}}
                        floatingLabelText="Value"
                    />
                    {index > 0 ?
                        <IconButton style={{
                            display: "inline-block",
                            verticalAlign: "bottom",
                            minWidth: "28px",
                            width: "28px",
                        }} disabled={disabled} onClick={() => fields.remove(index)}>
                            <ContentRemove/>
                        </IconButton>
                        : ""}

                </div>)}
                <IconButton style={{
                    display: "inline-block",
                    verticalAlign: "bottom",
                    minWidth: "28px",
                    width: "28px",
                }} disabled={disabled} onClick={() => fields.push("")}>
                    <ContentAdd/>
                </IconButton>
            </div>)
    };
    renderKeysToMultiValues = (disabled, title) => ({fields}) => {
        return (<div style={{
            width: "100%",
            display: "inline-block",
            paddingRight: "10px",
        }}>
            <div style={{
                color: disabled ? "#9c9c9c" : "rgb(0, 188, 212)",
                width: "20%",
                paddingTop: "45px",
                paddingRight: "15px",
                display: "inline-block",
                verticalAlign: "top",
                textAlign: "right",
                fontFamily: "Roboto, sans-serif",
            }}>{title}
            </div>
            <div style={{
                display: "inline-block",
                width: "75%",
            }}>
                {fields.map((field, index) => <div key={index} style={{
                    display: "inline-block",
                    width: "90%",
                }}>
                    <div style={{
                        width: "35%",
                        padding: "5px",
                        display: "inline-block",
                        verticalAlign: "top",
                    }}>
                        <Field
                            disabled={disabled}
                            name={`${field}.name`}
                            component={AutoComplete}
                            hintText="Name"
                            floatingLabelText="Name"
                            fullWidth={true}
                            openOnFocus
                            filter={MUIAutoComplete.fuzzyFilter}
                            dataSource={[]}
                        />
                    </div>
                    <FieldArray name={`${field}.values`} component={this.renderValues(disabled)}/>
                    {index > 0 ? <FloatingActionButton mini={true} style={{
                        display: "inline-block",
                        verticalAlign: "bottom"
                    }} disabled={disabled} onClick={() => fields.remove(index)}>
                        <ContentRemove/>
                    </FloatingActionButton> : ""}
                </div>)}
                <FloatingActionButton mini={true} style={{
                    display: "inline-block",
                    verticalAlign: "bottom",
                }} disabled={disabled} onClick={() => fields.push({
                    values: [""]
                })}>
                    <ContentAdd/>
                </FloatingActionButton>
            </div>
        </div>)
    };
    renderKeysToValues = (disabled, title) => ({fields}) => {
        return (<div style={{
            width: "100%",
            display: "inline-block",
            paddingRight: "10px",
        }}>
            <div style={{
                color: disabled ? "#9c9c9c" : "rgb(0, 188, 212)",
                width: "20%",
                paddingTop: "45px",
                paddingRight: "15px",
                display: "inline-block",
                verticalAlign: "top",
                textAlign: "right",
                fontFamily: "Roboto, sans-serif",
            }}>{title}
            </div>
            <div style={{
                display: "inline-block",
                width: "75%",
            }}>
                {fields.map((field, index) => <div key={index} style={{
                    display: "inline-block",
                    width: "90%",
                }}>
                    <div style={{
                        width: "35%",
                        padding: "5px",
                        display: "inline-block",
                        verticalAlign: "top",
                    }}>
                        <Field
                            disabled={disabled}
                            name={`${field}.name`}
                            component={AutoComplete}
                            hintText="Name"
                            floatingLabelText="Name"
                            fullWidth={true}
                            openOnFocus
                            filter={MUIAutoComplete.fuzzyFilter}
                            dataSource={[]}
                        />
                    </div>
                    <div style={{
                        width: "45%",
                        padding: "5px",
                        paddingRight: "10px",
                        display: "inline-block",
                        verticalAlign: "bottom",
                    }}>
                        <Field
                            disabled={disabled}
                            fullWidth={true}
                            name={`${field}.value`}
                            component={TextField}
                            hintText="Value"
                            floatingLabelText="Value"
                        />
                    </div>
                    {index > 0 ? <FloatingActionButton mini={true} style={{
                        display: "inline-block",
                        verticalAlign: "bottom"
                    }} disabled={disabled} onClick={() => fields.remove(index)}>
                        <ContentRemove/>
                    </FloatingActionButton> : ""}
                </div>)}
                <FloatingActionButton mini={true} style={{
                    display: "inline-block",
                    verticalAlign: "bottom",
                }} disabled={disabled} onClick={() => fields.push({})}>
                    <ContentAdd/>
                </FloatingActionButton>
            </div>
        </div>)
    };

    render() {
        const disabled = !this.props.enabled;
        return (
            <form style={{
                borderBottomStyle: "dashed",
                borderBottomWidth: "1px",
                paddingBottom: "10px",
                marginBottom: "10px",
                display: "table",
                width: "100%",
            }}>
                <div style={{
                    display: "inline"
                }}>
                    <div style={{
                        width: "10%",
                        display: "inline-block",
                        verticalAlign: "top",
                    }}>
                        <div style={{
                            paddingRight: "10px",
                            padding: "5px",
                            display: "inline-block",
                        }}>
                            <Field
                                name="enabled"
                                component={Toggle}
                                label="Filter"
                                labelPosition="left"
                                ref="enabled"
                            />
                        </div>
                    </div>
                    <div style={{
                        width: "90%",
                        display: "inline-block",
                        verticalAlign: "bottom",
                    }}>
                        <div style={{
                            width: "35%",
                            display: "inline-block",
                            verticalAlign: "top",
                        }}>
                            <div>
                                <div style={{
                                    width: "45%",
                                    padding: "5px",
                                    display: "inline-block",
                                    verticalAlign: "top",
                                }}>
                                    <Field
                                        disabled={disabled}
                                        name="method"
                                        component={AutoComplete}
                                        fullWidth={true}
                                        floatingLabelText="Method"
                                        openOnFocus
                                        filter={MUIAutoComplete.fuzzyFilter}
                                        dataSource={['CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'TRACE']}
                                    />
                                </div>

                                <div style={{
                                    width: "45%",
                                    padding: "5px",
                                    display: "inline-block",
                                    verticalAlign: "top",
                                }}>
                                    <Field
                                        disabled={disabled}
                                        name="path"
                                        component={TextField}
                                        fullWidth={true}
                                        hintText="Path"
                                        floatingLabelText="Path"
                                    />
                                </div>
                            </div>
                            <div>
                                <div style={{
                                    width: "45%",
                                    padding: "5px",
                                    display: "inline-block",
                                    verticalAlign: "bottom",
                                }}>
                                    <Field
                                        disabled={disabled}
                                        name="secure"
                                        component={Toggle}
                                        label="Secure"
                                        labelPosition="right"
                                    />
                                </div>

                                <div style={{
                                    width: "45%",
                                    padding: "5px",
                                    display: "inline-block",
                                    verticalAlign: "bottom",
                                }}>
                                    <Field
                                        disabled={disabled}
                                        name="keepAlive"
                                        component={Toggle}
                                        label="Keep-Alive"
                                        labelPosition="right"
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{
                            width: "65%",
                            display: "inline-block",
                            verticalAlign: "bottom",
                        }}>
                            <div>
                                <FieldArray name={`headers`} component={this.renderKeysToMultiValues(disabled, "Headers:")}/>
                                <FieldArray name={`cookies`} component={this.renderKeysToValues(disabled, "Cookies:")}/>
                                <FieldArray name={`queryStringParameters`} component={this.renderKeysToMultiValues(disabled, "Query Parameters:")}/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

const formName = 'requestFilter';
const selector = formValueSelector(formName);

Form = connect(  (state, props) => ({
    enabled: !!selector(state, 'enabled')
}), {})(Form);

Form = reduxForm({
    form: formName,
    initialValues: {
        headers: [{
            values: [""]
        }],
        queryStringParameters: [{
            values: [""]
        }],
        cookies: [{}],
    },
})(Form);

export default Form;