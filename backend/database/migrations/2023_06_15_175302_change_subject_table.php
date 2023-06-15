<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('subjects', function (Blueprint $table) {
            $table->longText('content')->nullable();
            $table->string('book_file')->nullable();
        });
        Schema::table('session', function (Blueprint $table) {
            $table->year('year')->change();
        });
    }

    public function down(): void
    {
        Schema::table('subjects', function (Blueprint $table) {
            $table->dropColumn('content');
            $table->dropColumn('book_file');
        });

        Schema::table('session', function (Blueprint $table) {
            $table->smallInteger('year')->change();
        });
    }
};
