// 1. Create a token (unpredictable string)
const token = crypto.randomUUID();
    console.log(token);
    
// 2. Send the token to the client set in cookie
// 3. Get the token from the client
// 4. Verify the token