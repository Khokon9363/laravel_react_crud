<?php

namespace App\Http\Controllers;

use App\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function contacts()
    {
        $contacts = Contact::all();

        return response()->json($contacts, 200);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name'  => 'required|max:50',
            'phone' => 'required|max:20'
        ]);

        $contact = new Contact();
        $contact->name = $request->name;
        $contact->phone = $request->phone;
        $contact->save();

        return response()->json($contact, 200);
    }
    public function edit($id)
    {
        $contact = Contact::find($id);

        return response()->json($contact, 200);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'name'  => 'required|max:50',
            'phone' => 'required|max:20'
        ]);

        $contact = Contact::find($id);
        $contact->name = $request->name;
        $contact->phone = $request->phone;
        $contact->save();

        return response()->json($contact, 200);
    }
    public function destroy($id)
    {
        Contact::destroy($id);

        return response()->json('destroyed', 200);
    }
}
