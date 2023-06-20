<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign('tasks_subject_id_foreign');
            $table->foreign('subject_id')->references('id')->on('subjects')->cascadeOnDelete()->cascadeOnUpdate();
        });
        Schema::table('session_scores', function (Blueprint $table) {
            $table->dropForeign('session_student_id_foreign');
            $table->dropForeign('session_statement_id_foreign');
            $table->foreign('student_id')->references('id')->on('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreign('statement_id')->references('id')->on('statements')->cascadeOnDelete()->cascadeOnUpdate();
        });
        Schema::table('statements', function (Blueprint $table) {
            $table->dropForeign('statements_subject_id_foreign');
            $table->foreign('subject_id')->references('id')->on('subjects')->cascadeOnDelete()->cascadeOnUpdate();
        });
    }


    public function down(): void
    {

    }
};
