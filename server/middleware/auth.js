import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        // Get the Authorization header value from the request
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            // Handle the case where the token is missing
            return res.status(401).json({ message: 'Authorization token missing' });
        }

        // Check if the token is for custom authentication or Google authentication
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = await jwt.verify(token, 'test');
            req.userId = decodedData?.id; // Assuming your custom token contains user ID in the 'id' field
        } else {
            decodedData = await jwt.decode(token);
            req.userId = decodedData?.sub; // Assuming Google token contains user ID in the 'sub' field
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default auth;



// import jwt from 'jsonwebtoken';

// const auth = async (req, res, next) => {
//     try {
//         // Check if the Authorization header is present in the request
//         if (!req.headers.authorization) {
//             return res.status(401).json({ message: 'Authorization header missing' });
//         }

//         // Get the Authorization header value from the request
//         const token = req.headers.authorization.split(' ')[1];

//         // Check if the token is for custom authentication or Google authentication
//         const isCustomAuth = token.length < 500;

//         let decodedData;

//         if (token && isCustomAuth) {
//             decodedData = await jwt.verify(token, 'test');
//             req.userId = decodedData?.id; // Assuming your custom token contains user ID in the 'id' field
//         } else {
//             decodedData = await jwt.decode(token);
//             req.userId = decodedData?.sub; // Assuming Google token contains user ID in the 'sub' field
//         }

//         next();
//     } catch (error) {
//         console.log(error);
//         res.status(401).json({ message: 'Invalid token' });
//     }
// };

// export default auth;