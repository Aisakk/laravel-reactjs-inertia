import { useEffect, useState } from "react"
import { Link, router } from '@inertiajs/react'
import Modal from "./Modal"
import axios from "axios";

export default function TableTask({ user, task}:any){
    const [modal, setModal] = useState(false);
    const [dataTaskInModal, setDataModal] = useState({});
    const [newUpdateTask, setUpdateTask] = useState('');
    const [iterateTask, setIterateTask] = useState([]);
    const [userName, setUser] = useState()
    const [createTask, setCreateTask] = useState('')

    function showModal(data:any){
        setModal(!modal);
        setDataModal(data)
    }
    function updateTask(e:any){
       setUpdateTask(e.target.value)
    }
    function handleSubmit(e:any){
        e.preventDefault()
        let data = {
                task: newUpdateTask,
                user_id: dataTaskInModal.user_id
        }
        axios.put(`/user/task/${dataTaskInModal.id}`, {
            data
        }).then(res=>{
            setIterateTask(res.data.task)
        })
        setModal(!modal)
    }
    function deleteTask(data:any){
        axios.delete(`/user/task/${data.id}`, {
            data:{
                user_id: data.user_id,
                id_task: data.id
            }
        }).then(response => {
            setIterateTask(response.data.task)
        })
    }
    function updateTaskFinish(event:any){
        const value = event.target.value;
        const nameId = event.target.name
        const check = event.target.checked

        axios.patch(`/user/task/${nameId}`,{
            data:{
                user_id: value,
                newData: check
            }
        }).then(response => setIterateTask(response.data.task))

    }
    function taskInput(e:any){
        setCreateTask(e.target.value)
    }
    function createTaskSubmit(e:any){
        e.preventDefault()
        axios.post('/task/create',{
            data:{
                task: createTask,
                user_id: user.id
            }
        }).then(response =>{
            setIterateTask(response.data.task)
        })
    }
    useEffect(()=>{
        setIterateTask(task)
    }, [])
    return(
        <div className="flex flex-col justify-center items-center p-4 gap-3">
            <p className="font-bold text-xl text-center">Nombre Usuario: {user.nombre}</p>
            <form onSubmit={createTaskSubmit}>
                <input type="text" name="task" id="task" onChange={taskInput} className="rounded border border-gray-300"/>
                <button type="submit" className="p-2 bg-green-400 hover:bg-green-300 text-white rounded">Crear Tarea</button>
            </form>
            <Link href="/" as="button" className="text-white bg-blue-400 w-32 hover:bg-blue-300 self-center rounded">Regresar</Link>
            <table className="table-auto rounded">
                <thead className="rounded">
                    <tr className="bg-blue-400 text-white text-center rounded-md">
                        <th className="p-2">#</th>
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Fecha de Creacion</th>
                        <th className="p-2">Fecha de Actualizacion</th>
                        <th className="p-2">Actualizar</th>
                        <th className="p-2">Eliminar</th>
                        <th className="p-2">Completar Tarea</th>
                    </tr>
                </thead>
                <tbody>
                    {iterateTask.map((data:any, index:number)=>{
                        return (<tr key={index} className="bg-blue-50">
                            <td className="p-2 text-center">{index}</td>
                            <td className={(data.completed == true ? "underline decoration-1" : "text-white") + "p-2 text-center"}>{data.nombre_task}</td>
                            <td className="p-2 text-center">{data.created_at}</td>
                            <td className="p-2 text-center">{data.updated_at}</td>
                            <td className="p-2 text-center"><button className="bg-orange-400 hover:bg-orange-300 text-white p-2 rounded " onClick={()=>{ showModal(data)}}>Actualizar</button></td>
                            <td className="p-2 text-center"><button className="bg-red-400 hover:bg-red-300 text-white p-2 rounded " onClick={()=> deleteTask(data)}>Elimnar</button></td>
                            <td className="p-2 text-center">
                                <input
                                 type="checkbox"
                                  name={data.id}
                                  defaultChecked={data.completed}
                                  value={data.user_id}
                                  onChange={updateTaskFinish}/></td>

                        </tr>)
                    })}
                    <Modal show={modal} onClose={()=>setModal(!modal)}>
                        <form onSubmit={handleSubmit} className="flex flex-col p-3">
                            id---{dataTaskInModal.user_id} --Antigua Nombre {dataTaskInModal.nombre_task} -Nuevo Nombre Tarea {newUpdateTask}
                            <input type="text" name="update" onChange={updateTask} required/>
                            <button type="submit">Agregar nuevo Valor</button>
                        </form>
                    </Modal>
                </tbody>
            </table>
        </div>
    )
}
