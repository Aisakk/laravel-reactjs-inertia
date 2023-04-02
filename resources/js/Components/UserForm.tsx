import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react"
import RegisterForm from "./RegisterForm";


export default function UserForm(){
    const [modal, setModal] = useState(false);
    const {data, setData, post,  errors} = useForm({
        name: ''
    })

    const handleChange = (e:any) => {
        setData('name', e.target.value)
        console.log(data)
    }
    const handleSubmit = (e:any) => {
        e.preventDefault()
        post('/user/task', {
             data:data
        })
    }
    function showModal(){
        setModal(!modal);
    }
    return(
        <div className="flex flex-col shadow-lg w-96 justify-center p-5 rounded h-50">
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input type="text" placeholder="Ingresa Usuario" name="nombre_user" id="nombre" onChange={handleChange} required className="border border-gray-200 rounded-sm p-2 mt-2 focus:border-orange-400"/>
                {errors.name && <div>{errors.name}</div>}
                <button type="submit" className="p-2 mt-3 bg-orange-400 text-white rounded-sm hover:bg-orange-300 min-w-full cursor-pointer self-end">Ingresar</button>
            </form>
            <RegisterForm />
        </div>
    )
}
