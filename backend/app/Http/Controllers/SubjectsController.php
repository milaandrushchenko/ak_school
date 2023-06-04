<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubjectResource;
use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectsController extends Controller
{
    public function index(){
        $subj = Subject::query()->orderBy('name', 'desc')->get();
        return SubjectResource::collection($subj);

//        $user = auth()->user();

//        if ($user->hasRole('admin')) {
//            // Якщо користувач є адміном, показуємо всі предмети
////            $subjects = Subjects::query()->orderBy('name', 'desc')->get();
//        } else if ($user->hasRole('teacher')) {
//            // Якщо користувач є вчителем, показуємо тільки ті предмети, які він веде
////            $subjects = $user->teacherSubjects()->orderBy('name', 'desc')->get();
//        } else if ($user->hasRole('student')) {
//            // Якщо користувач є учнем, показуємо тільки ті предмети, які призначені його класу
//              $subjects = $user->studentsSubjects()->orderBy('name', 'desc')->get();
//        } else {
//            // Якщо роль користувача не відповідає жодній з вище перерахованих, показуємо порожній список класів
//            $subjects = [];
//        }
    }

    public function show($id){
        return ('');
    }

    public function store(){

    }
}
