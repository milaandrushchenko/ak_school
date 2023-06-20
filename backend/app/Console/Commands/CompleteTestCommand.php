<?php

namespace App\Console\Commands;

use App\Models\Answer;
use Illuminate\Console\Command;

class CompleteTestCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:complete-test-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $testId = $this->argument('testId');
        info($testId);
        return;
    }
}
