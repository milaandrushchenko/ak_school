<?php

namespace App\Http\Controllers;

use App\Http\Requests\user\StoreUserRequest;
use App\Http\Requests\user\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Classes;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //$perPage = $request->input('per_page', 10);
        return UserResource::collection(
            User::query()->orderBy('id', 'desc')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $data['status'] = 0;
        $role = $data['role'];
        unset($data['role']);

        $user = User::create($data);

        $role = Role::findByName($role, 'web'); // знайти роль за іменем
        $user->assignRole($role); // додати роль до користувача
        return response(new UserResource($user), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $role = $data['role'];
        unset($data['role']);

        $role = Role::findByName($role, 'web'); // знайти роль за іменем

        $user->syncRoles($role);

        $user->update($data);
        return new UserResource($user);
    }

    public function newPassword(Request $request, User $user)
    {
        $newPassword = $request->input('password');

        if ($newPassword) {
            $newPassword = bcrypt($newPassword);
            $user->update(['password' => $newPassword]);
        }
        return response()->json(['message' => 'Пароль успішно оновлено'], 200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if ($user->hasRole('student')) {
            if ($user->classes) {
                return response([
                    'message' => 'Помилка! Даний користувач не може бути видаленим! ',
                    'data' => [$user->classes]
                ], 422);
            }
        }
        if ($user->hasRole('teacher')){
            if ($user->teacherClasses->count() > 0 || $user->teacherTests->count() > 0 || $user->teacherSubjects->count() > 0) {
                return response([
                    'message' => 'Помилка! Даний користувач не може бути видаленим!',
                    'data' => [$user->monitorClasses, $user->teacherClasses, $user->teacherTests, $user->teacherSubjects]
                ], 422);
            }
        }
        $user->delete();

        return response('user was deleted', 204);
    }

    public function getStudentsForClass($classId = null)
    {
        $studentsWithoutClass = User::where('class_id', null)
            ->whereHas('roles', function ($query) {
                $query->where('name', 'student');
            })
            ->get();;

        if ($classId) {
            $class = Classes::with('students')->find($classId);
            if ($class) {
                $students = $class->students->merge($studentsWithoutClass);
            } else {
                $students = $studentsWithoutClass;
            }
        } else {
            $students = $studentsWithoutClass;
        }

        return UserResource::collection($students);
    }

}
