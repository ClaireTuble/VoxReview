import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Load all JSX files in the pages directory dynamically
const pages = import.meta.glob("./pages/**/*.jsx");

const generateRoutes = () => {
  const routes = [];
  
  for (const path in pages) {
    // path example: './pages/admin/Dashboard.jsx'
    const cleanPath = path
      .replace(/^\.\/pages\//, "") // Remove './pages/'
      .replace(/\.(jsx|js|tsx|ts)$/, ""); // Remove extension

    const segments = cleanPath.split("/");
    const filename = segments[segments.length - 1];
    const parentSegments = segments.slice(0, -1);

    const formatSegment = (s, useKebab) => {
      if (s.startsWith("[") && s.endsWith("]")) {
        return ":" + s.slice(1, -1);
      }
      if (useKebab) {
        return s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
      }
      return s.toLowerCase();
    };

    const paths = [];

    // Exact lowercase route
    const exactPath = segments.map(s => formatSegment(s, false)).join("/");
    paths.push(`/${exactPath}`);

    // Kebab route for camelCase/PascalCase
    const kebabPath = segments.map(s => formatSegment(s, true)).join("/");
    if (kebabPath !== exactPath) {
      paths.push(`/${kebabPath}`);
    }

    // Default folders index/dashboard/landingpage/home
    const lowercaseFilename = filename.toLowerCase();
    if (
      lowercaseFilename === "index" ||
      lowercaseFilename === "dashboard" ||
      lowercaseFilename === "landingpage" ||
      lowercaseFilename === "home"
    ) {
      if (parentSegments.length === 0) {
        paths.push("/");
      } else {
        const parentPath = parentSegments.map(s => formatSegment(s, false)).join("/");
        paths.push(`/${parentPath}`);
        paths.push(`/${parentPath}/`);
        
        const parentKebabPath = parentSegments.map(s => formatSegment(s, true)).join("/");
        if (parentKebabPath !== parentPath) {
          paths.push(`/${parentKebabPath}`);
          paths.push(`/${parentKebabPath}/`);
        }
      }
    }

    const uniquePaths = [...new Set(paths)];
    const Component = React.lazy(pages[path]);

    uniquePaths.forEach(routePath => {
      routes.push({
        path: routePath,
        Component: Component,
      });
    });
  }

  return routes;
};

const routes = generateRoutes();

// Debug helper to print generated routes in browser console
console.log("Dynamically registered routes:", routes.map(r => r.path));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "sans-serif",
          color: "#6b21a8"
        }}>
          Loading page...
        </div>
      }>
        <Routes>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          {/* Default fallback route: redirect to root if path not found */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;