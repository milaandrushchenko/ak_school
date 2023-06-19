<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });

        Schema::table('subjects', function (Blueprint $table) {
            $table->dropColumn('book_file');
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('files');
        Schema::table('subjects', function (Blueprint $table) {
            $table->string('book_file')->nullable();
        });
    }
};
