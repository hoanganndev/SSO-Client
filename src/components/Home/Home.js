import React from "react";

const Home = () => {
    return (
        <div className="container home-customize">
            <div className="row">
                <div className="title">Single Sign On (SSO)</div>
                <div className="feature">Các chức năng chính</div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        1. Đăng nhập sử dụng Session với Passport.js (NodeJS)
                    </li>
                    <li className="list-group-item">
                        2. Sử dụng Access_token, Refress_token và cookie để đăng
                        nhập (ReactJS)
                    </li>
                    <li className="list-group-item">
                        3. Đăng nhập với Google/Facebook account
                    </li>
                    <li className="list-group-item">
                        3. Sử dụng hệ cơ sở dữ liệu quan hệ với database Mysql,
                        Postgres
                    </li>
                    <li className="list-group-item">
                        4. Xây dựng service sử dụng Access_token
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Home;
