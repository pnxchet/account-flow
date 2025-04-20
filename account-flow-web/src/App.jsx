import "./App.css";
import { Helmet } from "react-helmet-async";
import { CacheProvider } from "@emotion/react";
import { uuidv7 } from "uuidv7";
import emotionCreateCache from "@emotion/cache";
import AppRouter from "./routes/AppRouter";

const correctlyNoncedEmotionCache = emotionCreateCache({
  key: "styled-components-cache-key",
  nonce: uuidv7(),
  prepend: true,
});

function App() {
  return (
    <>
      <Helmet>
        <title>Account Flow</title>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; 
                   img-src 'self' https://inwfile.com https://www.pngall.com https://i5.walmartimages.com https://assets.ajio.com https://png.pngtree.com https://media-cdn.bnn.in.th https://encrypted-tbn0.gstatic.com https://www.pngarts.com;
                   font-src 'none';
                   connect-src 'none';
                   frame-src 'none';
                   object-src 'none';
                   media-src 'none';
                   base-uri 'none';
                   script-src 'self' http://localhost:5173 ;
                   style-src 'unsafe-inline'; 
                   worker-src 'none';"
        />
      </Helmet>
      <CacheProvider value={correctlyNoncedEmotionCache}>
        <AppRouter />
      </CacheProvider>
    </>
  );
}

export default App;
