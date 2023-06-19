<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('session', function (Blueprint $table) {
            $table->foreign('statement_id')->references('id')->on('statements');
        });
    }

    public function down(): void
    {
        Schema::table('session', function (Blueprint $table) {
            $table->dropForeign('session_statement_id_foreign');
        });
    }
};
