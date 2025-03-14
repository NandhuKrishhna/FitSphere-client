import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, RootState, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { StrictMode } from "react";
import { connectSocket } from "./lib/socketManager.ts";
import CustomToaster from "./components/CustomToaster.tsx";
persistor.subscribe(() => {
  if (persistor.getState().bootstrapped) {
    const state: RootState = store.getState();
    const { auth } = state;
    console.log(auth)

    if (auth?.currentUser?._id) {
      connectSocket(auth.currentUser._id, store.dispatch);
    }
  }
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <CustomToaster />
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
