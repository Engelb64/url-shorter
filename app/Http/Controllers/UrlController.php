<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Url;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use OpenApi\Annotations as OA;

/**
* @OA\Info(title="API Url", version="1.0")
*
* @OA\Server(url="http://swagger.local")
*/
class UrlController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/urls",
     *     tags={"URLs"},
     *     summary="Get all URLs",
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Page number",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="per_page",
     *         in="query",
     *         description="Number of results per page",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="List of URLs"),
     *     @OA\Response(response=500, description="Server error")
     * )
     */
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10); 
        $page = $request->get('page', 1); 

        $urls = Cache::remember("urls_page_{$page}_per_page_{$perPage}", 600, function () use ($perPage) {
            return Url::paginate($perPage);
        });

        return response()->json($urls);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/shorten",
     *     tags={"URLs"},
     *     summary="Shorten a URL",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="original_url", type="string", format="url")
     *         )
     *     ),
     *     @OA\Response(response=201, description="URL shortened successfully"),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function shorten(Request $request)
    {
        $request->validate(['original_url' => 'required|url']);

        $url = Url::create([
            'original_url' => $request->original_url,
            'shortened_url' => Str::random(8),
        ]);

        Cache::forget('urls');

        return response()->json($url, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/{shortened}",
     *     tags={"URLs"},
     *     summary="Redirect to the original URL",
     *     @OA\Parameter(
     *         name="shortened",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response=302, description="Redirect to original URL"),
     *     @OA\Response(response=404, description="URL not found")
     * )
     */
    public function redirect(Request $request, $shortened)
    {
        $url = Url::where('shortened_url', $shortened)->firstOrFail();

        if ($request->expectsJson()) {
            return response()->json(['original_url' => $url->original_url]);
        }

        return redirect($url->original_url, 302);
    }

    /**
     * @OA\Delete(
     *     path="/api/v1/urls/{id}",
     *     tags={"URLs"},
     *     summary="Delete a URL",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=204, description="URL deleted successfully"),
     *     @OA\Response(response=404, description="URL not found")
     * )
     */
    public function destroy($id)
    {
        $url = Url::findOrFail($id);
        $url->delete();

        Cache::forget('urls');

        return response()->json(null, 204);
    }
}
