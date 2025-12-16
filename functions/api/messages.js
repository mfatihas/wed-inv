/**
 * Cloudflare Pages Function for Guestbook Messages
 * Handles GET and POST requests for the messages API
 */

// Helper function to set CORS headers
function setCorsHeaders(response) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return response;
}

// Handle OPTIONS requests for CORS preflight
export async function onRequestOptions() {
    return setCorsHeaders(new Response(null, { status: 204 }));
}

// GET /api/messages - Fetch all messages
export async function onRequestGet({ env }) {
    try {
        const { results } = await env.DB.prepare(
            'SELECT id, name, message, created_at FROM messages ORDER BY created_at DESC LIMIT 100'
        ).all();

        return setCorsHeaders(
            new Response(JSON.stringify({ success: true, data: results }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            })
        );
    } catch (error) {
        console.error('Error fetching messages:', error);
        return setCorsHeaders(
            new Response(
                JSON.stringify({ success: false, error: 'Failed to fetch messages' }),
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            )
        );
    }
}

// POST /api/messages - Create a new message
export async function onRequestPost({ request, env }) {
    try {
        // Parse request body
        const body = await request.json();
        const { name, message } = body;

        // Validate input
        if (!name || !message) {
            return setCorsHeaders(
                new Response(
                    JSON.stringify({
                        success: false,
                        error: 'Name and message are required'
                    }),
                    {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' }
                    }
                )
            );
        }

        // Validate length
        if (name.trim().length === 0 || name.length > 100) {
            return setCorsHeaders(
                new Response(
                    JSON.stringify({
                        success: false,
                        error: 'Name must be between 1 and 100 characters'
                    }),
                    {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' }
                    }
                )
            );
        }

        if (message.trim().length === 0 || message.length > 500) {
            return setCorsHeaders(
                new Response(
                    JSON.stringify({
                        success: false,
                        error: 'Message must be between 1 and 500 characters'
                    }),
                    {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' }
                    }
                )
            );
        }

        // Insert message into database
        const result = await env.DB.prepare(
            'INSERT INTO messages (name, message) VALUES (?, ?)'
        )
            .bind(name.trim(), message.trim())
            .run();

        // Fetch the newly created message
        const { results } = await env.DB.prepare(
            'SELECT id, name, message, created_at FROM messages WHERE id = ?'
        )
            .bind(result.meta.last_row_id)
            .all();

        return setCorsHeaders(
            new Response(
                JSON.stringify({
                    success: true,
                    data: results[0]
                }),
                {
                    status: 201,
                    headers: { 'Content-Type': 'application/json' }
                }
            )
        );
    } catch (error) {
        console.error('Error creating message:', error);
        return setCorsHeaders(
            new Response(
                JSON.stringify({
                    success: false,
                    error: 'Failed to create message'
                }),
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            )
        );
    }
}
