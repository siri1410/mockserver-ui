import React from 'react'
import PropTypes from 'prop-types'
import LogMessage from "../components/LogMessage"

const LogList = ({logMessages}) => {
    return (
        <div style={{
            padding: "2px 1%"
        }}>
            <div className="header">Log Messages</div>
            <div id="style-5" style={{
                overflowY: "scroll",
                maxHeight: "400px",
                minHeight: "100px",
                transform: "scaleX(-1)",
                backgroundColor: "rgb(251, 251, 251)",
                borderRadius: "5px"
            }}>
                {logMessages.map((logMessage) => <LogMessage logMessage={logMessage} />)}
            </div>
        </div>
    )
};

LogList.propTypes = {
    logMessages: PropTypes.array.isRequired
};

export default LogList
