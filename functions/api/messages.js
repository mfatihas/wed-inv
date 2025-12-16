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

// GET /api/messages - Fetch messages with pagination
export async function onRequestGet({ request, env }) {
    try {
        // Parse query parameters from URL
        const url = new URL(request.url);
        const pageParam = url.searchParams.get('page');
        const limitParam = url.searchParams.get('limit');

        // Parse and validate pagination parameters
        let page = parseInt(pageParam) || 1;
        let limit = parseInt(limitParam) || 5;

        // Ensure page is at least 1
        if (page < 1) {
            page = 1;
        }

        // Clamp limit to safe range (1-10)
        if (limit < 1) {
            limit = 1;
        } else if (limit > 10) {
            limit = 10;
        }

        // Calculate offset for pagination
        const offset = (page - 1) * limit;

        // Fetch limit + 1 rows to detect if more data exists
        const { results } = await env.DB.prepare(
            'SELECT id, name, message, created_at FROM messages ORDER BY created_at DESC LIMIT ? OFFSET ?'
        )
            .bind(limit + 1, offset)
            .all();

        // Determine if there are more results
        const hasMore = results.length > limit;

        // Slice to actual limit (remove the extra row used for detection)
        const data = hasMore ? results.slice(0, limit) : results;

        return setCorsHeaders(
            new Response(
                JSON.stringify({
                    success: true,
                    data: data,
                    page: page,
                    limit: limit,
                    hasMore: hasMore
                }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                }
            )
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
