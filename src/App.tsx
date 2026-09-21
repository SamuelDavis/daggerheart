import { lazy } from "solid-js";
import { Route, HashRouter as Router } from "@solidjs/router";
import Layout from "./Pages/Layout";
import { AppStateProvider } from "./AppState";

const Home = lazy(() => import("./Pages/Home"));
const Create = lazy(() => import("./Pages/Create"));
const NotFound = lazy(() => import("./Pages/NotFound"));

export default function App() {
  return (
    <AppStateProvider>
      <Router root={Layout}>
        <Route path="/" component={Home} />
        <Route path="/create" component={Create} />
        <Route path="*404" component={NotFound} />
      </Router>
    </AppStateProvider>
  );
}
