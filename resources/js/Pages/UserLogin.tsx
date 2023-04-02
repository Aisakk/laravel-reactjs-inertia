import RegisterForm from "@/Components/RegisterForm"
import UserForm from "@/Components/UserForm"
import { useEffect, useState } from "react"


export default function User({data}:any){
    return(
        <div className="grid place-content-center content-center min-h-screen">
            {data}
            <UserForm />
        </div>
    )
}
