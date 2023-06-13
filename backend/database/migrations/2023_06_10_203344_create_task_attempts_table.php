<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('task_attempts', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->unsignedBigInteger('task_id');
            $table->foreign('task_id')->references('id')->on('tasks')
                ->cascadeOnDelete()->cascadeOnUpdate();

            $table->unsignedBigInteger('student_id');
            $table->foreign('student_id')->references('id')->on('users')
                ->cascadeOnUpdate()->cascadeOnDelete();

            $table->longText('content')->nullable();

            $table->longText('files')->nullable();

            $table->decimal('score')->nullable();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('task_attempts');
    }
};
