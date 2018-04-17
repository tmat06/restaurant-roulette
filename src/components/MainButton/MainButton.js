import React from 'react';
import FlatButton from 'material-ui/FlatButton';

let style = {
    color: '#F64548',
    fontFamily: 'Carter One, cursive',
    fontSize: 20,
    borderRadius: 25,
    backgroundColor: '#FFE49F',
    hover: {
        backgroundColor: "#000000"
    },
    // cursor: 'pointer',
    
    textAlign: 'left'
}

export default function MainButton(props) {
    if(props.style){
        style = Object.assign({}, style, props.style)
    }
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
                if (props.handleToggle){
                    props.handleToggle(props.toggle)
                }
                if (props.handleEnterSave){
                    props.handleEnterSave(props.listName, props.range)
                }
            }
            }

        />
    )
}