<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use function Symfony\Component\Translation\t;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        //Carbon::setLocale('uk');
        return [
            'id' => $this->id,
            'login' => $this->login,
            'first_name' => $this->first_name,
            'second_name' => $this->second_name,
            'password' => $this->password,
            'status' => User::getStatusTitleAttribute($this),
            //'email' => $this->email,
            'role' => isset($this->getRoleNames()[0]) ? $this->getRoleNames()[0] : null,
            'class' => $this->classes,

            'permissions' => $this->getPermissionsViaRoles()->pluck('name'),
            'created_at' => Carbon::parse($this->created_at)->isoFormat('DD MMMM, YYYY HH:mm'),

        ];
    }
}
