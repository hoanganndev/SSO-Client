import React, { useState } from "react";
import Weather from "./Weather";

const About = () => {
    const [cityState, setCityState] = useState("1236594");
    const handleSelect = e => {
        setCityState(e.target.value);
    };
    return (
        <div className="container">
            <select onChange={e => handleSelect(e)}>
                <option value="1236594">Hà Nội</option>
                <option value="1252431">Hồ Chí Minh</option>
            </select>
            <Weather cityState={cityState} />
        </div>
    );
};

export default About;
