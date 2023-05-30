<?php

namespace App\Http\Middleware;

use App\Models\Test;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckTestPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $testId = $request->route('test_id');
        $test = Test::findOrFail($testId);

        if ($request->user()->id !== $test->created_by) {
            return response()->json(['error' => 'Ви не маєте права редагувати цей тест.'], 403);
        }

        return $next($request);
    }
}
