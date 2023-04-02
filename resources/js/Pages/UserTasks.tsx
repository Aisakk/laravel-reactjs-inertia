import TableTask from "@/Components/TableTask";
import { useEffect } from "react";

export default function UserTasks({user, tasks}:any){
    return(
        <div className="min-h-screen grid grid-cols-1 place-content-center content-center">
            <TableTask user={user} task={tasks} />
        </div>
    )
}
