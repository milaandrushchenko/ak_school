<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::rename('session', 'session_scores');
    }

    public function down(): void
    {
        Schema::rename('session_scores', 'session');
    }
};
