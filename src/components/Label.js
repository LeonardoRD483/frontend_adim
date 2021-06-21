import React from 'react';
const Label = ({ texto }) => {
    return (
        <div>
            <label className="label">{texto}</label>
        </div>
    );
}

export default Label;