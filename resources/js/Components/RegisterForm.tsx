import { useState } from "react";
import Modal from "./Modal"
import { router, useForm } from "@inertiajs/react";

export default function RegisterForm(){
    const [modal, setModal] = useState(false);
    const {data, setData, post,  errors} = useForm({
        name: ''
    })
    const handleCreate = (e:any) => {
        setData('name', e.target.value)
    }

    const createUser = (e:any) => {
        e.preventDefault()
        post('/user/create', {
            data: data
        })
        setModal(!modal);
    }

    function showModal(){
        setModal(!modal);
    }
    return (
        <div>
            <button onClick={showModal} className="p-2 mt-3 bg-green-400 text-white rounded-sm hover:bg-green-300 min-w-full cursor-pointer self-end">Crear Usuario</button>
            <Modal show={modal} onClose={showModal}>
                <form onSubmit={createUser} className="flex flex-col p-5 gap-3">
                    <input type="text" onChange={handleCreate} required placeholder="Crear Usuario"/>
                    <button type="submit" className="p-5 bg-green-400">Crear</button>
                </form>
            </Modal>
        </div>
    )
}
