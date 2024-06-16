/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"

import { type FormEvent, useState } from "react"

export function SignUp(){

    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        dataOfBirth: "",
        password: "",
        checkPassword: ""
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (event: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const {name, value} = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (formData.checkPassword != formData.password){
            alert("Passwords do not match");
            return;
        }
        console.log(formData);
    };

    return <div className="border">
        <form action="post" onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold">Sign Up</h1>
        <table>
            <tr>
                <td><label htmlFor="">First Name</label></td>
                <td><input name="firstName" type="text" className="border" value={formData?.firstName} onChange={handleChange}/></td>
            </tr>
            <tr>
                <td><label htmlFor="">Middle Name</label></td>
                <td><input name="middleName" type="text" className="border" value={formData?.middleName} onChange={handleChange}/></td>
            </tr>
            <tr>
                <td><label htmlFor="">Last Name</label></td>
                <td><input name="lastName" type="text" className="border" value={formData?.lastName} onChange={handleChange}/></td>
            </tr>
            <tr>
                <td><label htmlFor="">Email</label></td>
                <td><input name="email" type="email" className="border" value={formData?.email} onChange={handleChange}/></td>
            </tr>
            <tr>
                <td><label htmlFor="">Date Of Birth</label></td>
                <td><input name="dataOfBirth" type="date" className="border" value={formData?.dataOfBirth} onChange={handleChange}/></td>
            </tr>
            <tr>
                <td><label htmlFor="">Password</label></td>
                <td><input name="password" type="password" className="border" value={formData?.password} onChange={handleChange}/></td>
            </tr>
            <tr>
                <td><label htmlFor="">Check Password</label></td>
                <td><input name="checkPassword" type="password" className="border" value={formData?.checkPassword} onChange={handleChange}/></td>
            </tr>
            <tr>
                <td><button type="submit" className="border p-1 rounded-md bg-blue-500">Sign Up</button></td>
            </tr>
        </table>
        </form>
    </div>
}
