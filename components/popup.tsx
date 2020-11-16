import React from "react";

const Popup = ({ feature }) => {
    const { id, name, description } = feature.properties;

    return (
        <div className={"bg-black p-3 rounded-md"} id={`popup-${id}`}>
            <h3>{name}</h3>
            {description}
        </div>
    );
};

export default Popup;