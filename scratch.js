import fs from "fs";
import path from "path";

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const targetDirs = ["src/components", "src/sections", "src/pages"];

targetDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    walkDir(dir, (filePath) => {
      if (filePath.endsWith(".tsx") || filePath.endsWith(".ts")) {
        let content = fs.readFileSync(filePath, "utf-8");
        let modified = false;

        // Replace Link
        if (content.includes("from \"react-router\"") || content.includes("from 'react-router'")) {
          content = content.replace(/import\s+\{[^}]*Link[^}]*\}\s+from\s+["']react-router["'];?/g, (match) => {
             return match.replace("react-router", "next/link").replace("useLocation", "");
          });
          modified = true;
        }

        // Replace useLocation
        if (content.includes("useLocation")) {
          content = content.replace(/useLocation/g, "usePathname");
          content = `import { usePathname } from "next/navigation";\n` + content;
          content = content.replace(/location\.pathname/g, "pathname");
          content = content.replace(/const location = /g, "const ");
          modified = true;
        }

        // Add "use client" if there's framer-motion or hooks
        if (
          !content.startsWith("\"use client\"") &&
          !content.startsWith("'use client'") &&
          (content.includes("framer-motion") || content.includes("useState") || content.includes("useEffect"))
        ) {
          content = `"use client";\n` + content;
          modified = true;
        }

        // Fix empty imports like import { } from "next/link" Note: handled crudely
        content = content.replace(/import\s*\{\s*,\s*\}\s*from\s*["']next\/link["'];?\n?/g, "");

        if (modified) {
          fs.writeFileSync(filePath, content);
          console.log("Updated", filePath);
        }
      }
    });
  }
});
