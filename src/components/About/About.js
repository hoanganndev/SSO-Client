import React, { useEffect } from "react";
import axiosClient from "../../customize/axios";

const About = () => {
    useEffect(() => {
        setTimeout(() => {
            axiosClient
                .get("http://localhost:8081/health")
                .then(res => console.log(">>> check res:", res))
                .catch(err => console.log(err));
        }, 0);
    }, []);
    return (
        <>
            <div className="btn btn-primary">About</div>
        </>
    );
};

export default About;
