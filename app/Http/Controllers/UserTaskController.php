<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Tasks;
use Carbon\Carbon;
use Illuminate\Console\View\Components\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserTaskController extends Controller
{
    //
    public function index(){
        return Inertia::render('UserLogin');
    }

    public function show(Request $request){
        $user_find = User::where('nombre', $request->name)->first();
        if($user_find == null){
            return Inertia::render('UserLogin',[
                'data' => 'No se encontro ningun Usuario',
            ]);
        }
        $tasks = Tasks::where('user_id',$user_find->id)->get();

        return Inertia::render('UserTasks', [
            "user" => $user_find,
            "tasks" => $tasks
        ]);
    }

    public function create(Request $request){
        $nombre = $request->name;
        $find_user = User::where("nombre", $nombre)->first();
        if($find_user === null){
            $user = User::create(["nombre"=> $nombre]);
            return redirect()->route('index');
        }else{
            return redirect()->route('index');
        }

    }

    public function create_task(Request $request){
        $user_id = $request->data["user_id"];
        $task = $request->data["task"];
        $find_user = User::find($user_id);
        $find_user->tasks()->create([
            "nombre_task" => $task,
            "completed" => false
        ]);
        $find_task = Tasks::where("user_id", $user_id)->get();
        return response()->json([
            "task" => $find_task
        ]);
    }

    public function update(Request $request, $id){
        $task = Tasks::find($id);
        $task->nombre_task = $request->data["task"];
        $task->save();

        $tasks = Tasks::where('user_id',$request->data["user_id"])->get();

        return response()->json([
            "task" => $tasks
        ]);
    }

    public function edit(Request $request, $id){
        $task = Tasks::find($id);
        $task->completed = $request->data["newData"];
        $task->save();

        $tasks = Tasks::where('user_id',$request->data["user_id"])->get();
        return response()->json([
            "task" => $tasks
        ]);
    }

    public function delete(Request $request, $id){
        $task = Tasks::find($id);
        $task->delete();

        $tasks = Tasks::where('user_id',$request->user_id)->get();

        return response()->json([
            "task"=> $tasks
        ]);
    }

}
