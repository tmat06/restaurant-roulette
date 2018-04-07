import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const style = {
    color: '#F64548',
    fontFamily: 'Carter One, cursive',
    fontSize: 20,
    borderRadius: 25,
    // cursor: 'pointer',
    hoverColor: "#FFA880",
    textAlign: 'left'
}

export default function MainButton(props) {
    return (
        <FlatButton
            label={props.name}
            labelPosition="after"
            style={style}
            icon={props.icon}
            labelStyle={{ fontSize: 30 }}
            fullWidth={props.wholeWidth}
            onClick={() => {
                if (props.handleToggle) {
                    props.handleToggle()
                }
                if (props.selectField) {
                    props.selectField(props.primaryName)
                }
            }
            }

        />
    )
}