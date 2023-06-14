<?php

use App\Models\Test;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('tests', function (Blueprint $table) {
            $table->enum('result_display_type', ['score_only', 'user_only', 'user_and_correct'])->default('score_only');
        });

        $tests = Test::all();

        foreach ($tests as $test) {

            $test->result_display_type = 'score_only'; // Значення за замовчуванням
            $test->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tests', function (Blueprint $table) {
            $table->dropColumn('result_display_type');
        });
    }
};
