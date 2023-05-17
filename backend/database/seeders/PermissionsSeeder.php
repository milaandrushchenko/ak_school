<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
        // create permissions
//        $arrayOfPermissionNames = [
//            //ADMIN
//            'show users',
//            'create users',
//            'delete users',
//
//            'view classes',
//            'create classes',
//            'delete classes',
//            'update classes',
//        ];
//
//        $permissions = collect($arrayOfPermissionNames)->map(function ($permission) {
//            return ['name' => $permission, 'guard_name' => 'web'];
//        });
//        Permission::insert($permissions->toArray());
//        $role = Role::findByName('admin');
//        $role->givePermissionTo(Permission::all());
//        $viewClasses = Permission::create(['name' => 'view classes']);
//        $createClasses = Permission::create(['name' => 'create classes']);
//        $deleteClasses = Permission::create(['name' => 'delete classes']);
//        $updateClasses = Permission::create(['name' => 'update classes']);
//
//        $admin = Role::findByName('admin');
//        $admin->givePermissionTo($viewClasses);
//        $admin->givePermissionTo($createClasses);
//        $admin->givePermissionTo($deleteClasses);
//        $admin->givePermissionTo($updateClasses);
//
//
//        $viewAssignedClasses = Permission::create(['name' => 'view assigned classes']);
//
//        $teacherRole = Role::findByName('teacher');
//        $teacherRole->givePermissionTo($viewAssignedClasses);
//        $updateUsers = Permission::create(['name' => 'update users']);
//        $newPassword = Permission::create(['name' => 'generate new password']);
//
//        $admin = Role::findByName('admin');
//        $admin->givePermissionTo($updateUsers);
//        $admin->givePermissionTo($newPassword);

        /////////TESTS//////

        $permissionsTestsForTeacher = [
            'view tests',
            'create tests',
            'delete tests',
            'update tests',
            'view test results',
        ];

        $teacher = Role::findByName('teacher');

        foreach ($permissionsTestsForTeacher as $permission) {
            $permission = Permission::create(['name' => $permission]);
            $teacher->givePermissionTo($permission);
        }

        $permissionsTestsForStudent = [
            'pass tests',
        ];

        $student = Role::findByName('student');

        foreach ($permissionsTestsForStudent as $permission) {
            $permission = Permission::create(['name' => $permission]);
            $student->givePermissionTo($permission);
        }

    }
}
