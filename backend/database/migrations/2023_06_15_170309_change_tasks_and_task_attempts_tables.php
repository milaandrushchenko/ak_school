<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropColumn('done');
            $table->dropColumn('score');
        });
        Schema::table('task_attempts', function (Blueprint $table) {
            $table->dateTime('done_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->boolean('done')->default(false);
            $table->unsignedTinyInteger('score')->nullable();
        });
        Schema::table('task_attempts', function (Blueprint $table) {
            $table->dropColumn('done_at');
        });
    }
};
