import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getContact, updateContact } from "~/data";


export const loader= async ({params} : LoaderFunctionArgs) => {
    invariant(params.contactId, "Missing contactId parameter");

    const contact = await getContact(params.contactId);

    if (!contact) {
        throw new Response("Not found", { status: 404 });
    }
    return json({ contact });
}

export const action = async ( {params, request}: ActionFunctionArgs) => {
  
    invariant(params.contactId, "Missing contactId parameter");

    const formData = await request.formData();
    
    const updates = Object.fromEntries(formData);

    await updateContact(params.contactId, updates);

    return redirect( `/contacts/${params.contactId}`,{ status:200 });
}

export default function EditContact(){
    const { contact } = useLoaderData<typeof loader>();

    return (
        <Form key={contact.id} method="post" id="contact-form">
            <p>
                <span>Name</span>
                <input
                    type="text"
                    name="first"
                    defaultValue={contact.first}
                    placeholder="First Name"
                    aria-label="First Name"
                />
                <input
                    type="text"
                    name="last"
                    defaultValue={contact.last}
                    placeholder="Last Name"
                    aria-label="Last Name"
                />
            </p>
            <label>
                <span>Twitter</span>
                <input
                    type="text"
                    name="twitter"
                    defaultValue={contact.twitter}
                    placeholder="@Twitter"
                />
            </label>
            <label >
                <span>Avatar</span>
                <input
                    type="text"
                    name="avatar"
                    defaultValue={contact.avatar}
                    placeholder="https://example.com/avatar.jpg"
                    aria-label="Avatar URL"
                />
            </label>
            <label >
                <span>Notes</span>
                <textarea
                    name="notes"
                    defaultValue={contact.notes}
                    rows={6}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button type="button">Cancel</button>
            </p>
        </Form>
    )
}