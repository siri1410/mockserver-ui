import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import LogList from "../containers/LogList";
import JsonList from "../containers/JsonList";
import {transform} from 'lodash/object'
import './grid.css';

class Grid extends Component {
    static propTypes = {
        entities: PropTypes.shape({
            activeExpectations: PropTypes.array.isRequired,
            recordedExpectations: PropTypes.array.isRequired,
            recordedRequests: PropTypes.array.isRequired,
            logMessages: PropTypes.array.isRequired,
            logMessageMaxWidth: PropTypes.number.isRequired
        }).isRequired
    };

    render() {
        const {
            entities: {
                activeExpectations = [],
                recordedExpectations = [],
                recordedRequests = [],
                logMessages = [],
                logMessageMaxWidth = 0
            },
        } = this.props;
        return (
            <div style={{}}>
                <div className="row" style={
                    {
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        margin: "15px 10px",
                        padding: "17px 17px"
                    }
                }>
                    <LogList items={logMessages}
                             header={"Log Messages (most recent at the top)"}
                             logMessageMaxWidth={logMessageMaxWidth}/>
                </div>
                <div className="row" style={
                    {
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        margin: "15px 10px",
                        padding: "17px 17px"
                    }
                }>
                    <JsonList items={activeExpectations}
                              header={"Active Expectations (in the order they are applied)"}
                              reverseIndex={false}/>
                </div>
                <div className="row" style={
                    {
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        margin: "15px 10px",
                        padding: "17px 17px"
                    }
                }>
                    <div style={
                        {
                            width: "49%",
                            float: "left",
                            padding: "0",
                            paddingRight: "1%",
                            borderRightStyle: "dashed",
                            borderRightWidth: "1px",
                        }
                    }>
                        <JsonList items={recordedRequests}
                                  header={"Received Requests (most recent at the top)"}/>
                    </div>
                    <div style={
                        {
                            width: "49%",
                            float: "right"
                        }
                    }>
                        <JsonList items={transform(recordedExpectations, function (result, expectation) {
                            result.push({
                                key: expectation.key,
                                value: {
                                    httpRequest: expectation.value.httpRequest,
                                    httpResponse: expectation.value.httpResponse,
                                },
                            });
                        }, [])} header={"Proxied Requests (most recent at the top)"}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        activeExpectations = [],
        recordedExpectations = [],
        recordedRequests = [],
        logMessages = [],
        logMessageMaxWidth = 0
    } = state.entities;

    return {
        entities: {
            activeExpectations,
            recordedExpectations,
            recordedRequests,
            logMessages,
            logMessageMaxWidth
        }
    }
};

export default connect(mapStateToProps, {})(Grid)
