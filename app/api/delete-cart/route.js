import { deleteCart } from '@/actions/delete-cart';

export async function POST(request) {
  try {
    const bodyText = await request.text(); // Here we need to use request.text() instead of request.json() because the body is a Blob since it's sent via navigator.sendBeacon
    const { cartId } = JSON.parse(bodyText);

    if (!cartId) {
      return new Response(JSON.stringify({ error: 'Missing cartId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Aquí tu lógica para borrar el cart (Supabase, DB, etc.)
    console.log('🗑️ Deleting cart with ID:', cartId);
    const error = await deleteCart(cartId);
    if (error) {
      console.error('Error deleting cart:', error);
      return new Response(JSON.stringify({ error: 'Failed to delete cart' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('Error deleting cart:', e);
    return new Response(JSON.stringify({ error: 'Invalid request format' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}