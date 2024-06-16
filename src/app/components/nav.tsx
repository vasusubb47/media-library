"use client";

import { useAuthContest } from "../context/AuthContext";

export function NavBar(){

    const AuthContext = useAuthContest();

    return <nav className="bg-slate-200 top-0 sticky">
        <div>
            <a href="/"><h1>Media Libyary</h1></a>
        </div>
        <div></div>
        <div>
            <ul>
                {(AuthContext.auth == null)? 
                <li><a href="/">Sign In</a></li> : 
                <li><a href="/">{AuthContext.auth?.email}</a></li> }
            </ul>
        </div>
    </nav>;
}