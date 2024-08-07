<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Models\News;
use Carbon\Carbon;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        try {
            $news = News::orderBy('created_at', 'desc')->get()->map(function($item) {
                if ($item->image) {
                    $item->image = Storage::url($item->image);
                }
                
                return $item;
            });
        
            return response()->json(['news' => $news], 200);
        } catch (\Exception $e) {
            return response()->json(['Error' => true, 'message' => $e->getMessage()]);
        }

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        try {
            $request->validate([
                'title' => 'required',
                'content' => 'required',
                'image' => 'nullable|image|max:2048',
            ]);
    
            $path = null;
            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('images', 'public');
            }
    
            $news = News::create([
                'title' => $request->title,
                'content' => $request->content,
                'image' => $path,
                // 'user_id' => Auth()::id()
                'user_id' => 1
            ]);
    
            return response()->json(['success' => true, 'news' => $news], 201);
        } catch (\Exception $e) {
            return response()->json(['Error' => true, 'message' => $e->getMessage()]);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $notice = News::findOrFail($id);

            $request->validate([
                'title' => 'required',
                'content' => 'required',
                'image' => 'nullable|image|max:2048',
            ]);

            $path = $notice->image;
            if ($request->hasFile('image')) {
                if ($path) {
                    Storage::disk('public')->delete($path);
                }

                $path = $request->file('image')->store('images', 'public');
            }

            $notice->update([
                'title' => $request->title,
                'content' => $request->content,
                'image' => $path,
            ]);

            return response()->json(['success' => true, 'news' => $notice], 200);

        } catch (\Exception $e) {
            return response()->json(['Error' => true, 'message' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $notice = News::find($id);

            // return response()->json(['success' => true, 'message' => $notice->image], 200);

            if ($notice) {
                if($notice->image) {
                    Storage::disk('public')->delete($notice->image);
                }

                $notice->delete();

                return response()->json(['success' => true, 'message' => 'News deleted successfully'], 200);

            }
            

        } catch (\Exception $e) {
            return response()->json(['Error' => true, 'message' => $e->getMessage()]);
        }
    }
}
