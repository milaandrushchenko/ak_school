<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('statements', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->year('year')->nullable();
            $table->boolean('semester')->nullable();
            $table->boolean('is_visible')->default(false);

            $table->unsignedBigInteger('subject_id');
            $table->foreign('subject_id')->references('id')->on('subjects');
        });
        Schema::table('session', function (Blueprint $table) {
            $table->dropColumn('year');
            $table->dropColumn('semester');
            $table->unsignedBigInteger('statement_id');
            $table->foreign('statement_id')->references('id')->on('statements');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('statements');
        Schema::table('session', function (Blueprint $table) {
            $table->year('year')->nullable();
            $table->boolean('semester')->nullable();
            $table->unsignedBigInteger('statement_id');
            $table->foreign('statement_id')->references('id')->on('statements');
        });
    }
};
