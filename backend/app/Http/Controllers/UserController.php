<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
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

        $user->syncRoles($data['role']);

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
        $user->delete();

        return response('', 204);
    }
}
