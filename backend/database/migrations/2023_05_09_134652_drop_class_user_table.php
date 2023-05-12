<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('class_user', function (Blueprint $table) {
            Schema::dropIfExists('class_user');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('class_user', function (Blueprint $table) {
            Schema::create('class_user', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('class_id');
                $table->unsignedBigInteger('user_id');
                $table->timestamps();

                $table->foreign('class_id')->references('id')->on('classes');
                $table->foreign('user_id')->references('id')->on('users');
                $table->primary(['class_id', 'user_id']);
                $table->unique('user_id');
            });
        });
    }
};
