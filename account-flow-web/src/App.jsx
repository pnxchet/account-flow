import "./App.css";
import { Helmet } from "react-helmet-async";
import { CacheProvider } from "@emotion/react";
import { uuidv7 } from "uuidv7";
import emotionCreateCache from "@emotion/cache";
import AppRouter from "./routes/AppRouter";
import useCommonStore from "./core/stores/commonStore";
import { AlertDialog } from "./components/common";

const correctlyNoncedEmotionCache = emotionCreateCache({
  key: "styled-components-cache-key",
  nonce: uuidv7(),
  prepend: true,
});

function App() {
  const { dialogContent, openDialog, dialogSubmit, dialogCancel } =
    useCommonStore();

  const dialogComponent = (
    <AlertDialog
      open={openDialog}
      title={dialogContent?.title}
      message={dialogContent?.message}
      width={dialogContent?.width}
      labelSubmit={dialogContent?.labelSubmit}
      submit={dialogSubmit}
      labelCancel={dialogContent?.labelCancel}
      cancel={dialogCancel}
    />
  );

  return (
    <>
      <Helmet>
        <title>Account Flow</title>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; 
                   img-src 'self' https://inwfile.com https://www.pngall.com https://i5.walmartimages.com https://assets.ajio.com https://png.pngtree.com https://media-cdn.bnn.in.th https://encrypted-tbn0.gstatic.com https://www.pngarts.com;
                   font-src 'none';
                   connect-src 'self' http://localhost:8080;
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
        {dialogComponent}
      </CacheProvider>
    </>
  );
}

export default App;
