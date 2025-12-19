// package com.example.PoleExcellence.Configs;

// import jakarta.servlet.*;
// import jakarta.servlet.http.HttpServletResponse;
// import jakarta.servlet.http.HttpServletRequest;
// import org.springframework.stereotype.Component;

// import java.io.IOException;

// @Component
// public class ResourceHeaderFilter implements Filter {

//     @Override
//     public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
//             throws IOException, ServletException {

//         HttpServletRequest req = (HttpServletRequest) request;
//         HttpServletResponse res = (HttpServletResponse) response;

//         String path = req.getRequestURI();

//         // Appliquer uniquement aux images
//         if (path.startsWith("/uploads/images/")) {
//             res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
//             res.setHeader("Content-Type", getContentTypeFromPath(path));
//         }

//         chain.doFilter(request, response);
//     }

//     private String getContentTypeFromPath(String path) {
//         if (path.endsWith(".png")) return "image/png";
//         if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
//         if (path.endsWith(".gif")) return "image/gif";
//         if (path.endsWith(".webp")) return "image/webp";
//         return "application/octet-stream";
//     }
// }

