const APIURL = 'https://fakestoreapi.com';

//              [USER]

// POST current user info to the server
export async function login(userData) {
    try {
        const response = await fetch(`${APIURL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userData.username,
                password: userData.password,
            }),
        });
        const result = await response.json();
        if (result.token) {
            localStorage.setItem('token', result.token);
            return result;
        }
    } catch (error) {
        console.log(error);
    }
}


// GET user info
export async function getMe(id, token) {
    if (!token) return null;
    try {
        const response = await fetch(`${APIURL}/users/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Response status:', response.status);
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw new Error('Failed to fetch user data');
        }
    } catch (error) {
        console.log('Error in getMe:', error);
        return null;
    }
}

//          [PRODUCTS]

// GET All Items
export async function fetchAllItems(){
    try {
        const response = await fetch(`${APIURL}/products`);
        const result = await response.json();
        // console.log('API Response:', result);
        return result;
    } catch (error) {
        console.log('Error fetching items:', error);
    }
}

// Get Single Item
export async function fetchSingleItem(id) {
    try {
        const response = await fetch(`${APIURL}/products/${id}`);
        const result = await response.json();
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//GET item by product id (use in Cart.jsx)
export async function fetchProductById(productId) {
    try {
      const response = await fetch(`${APIURL}/products/${productId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }


//          [CART]

// GET Cart by Cart ID
export async function getCartById(cartId) {
    try {
      const response = await fetch(`${APIURL}/carts/${cartId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  
// (POST) ADD TO CART
export async function addToCart(userId, productId, quantity, token) {
    try {
        const response = await fetch(`${APIURL}/carts/user/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                userId,
                products: [{ productId, quantity }],
                date: new Date().toISOString(),
            }),
        });
        const result = await response.json();
        return result.item;
    } catch (error) {
        console.log(error);
    }
}

// DELETE items from cart
export async function removeFromCart(productId, token) {
    try {
        const response = await fetch(`${APIURL}/carts/${productId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error removing item from cart:', error);
    }
}

