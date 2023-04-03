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
//        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
//        // create permissions
//        $arrayOfPermissionNames = [
//            //ADMIN
//            'show users',
//            'create users',
//            'delete users'
//        ];
//
//        $permissions = collect($arrayOfPermissionNames)->map(function ($permission) {
//            return ['name' => $permission, 'guard_name' => 'web'];
//        });
//        Permission::insert($permissions->toArray());
        $role = Role::findByName('admin');
        $role->givePermissionTo(Permission::all());

    }
}
