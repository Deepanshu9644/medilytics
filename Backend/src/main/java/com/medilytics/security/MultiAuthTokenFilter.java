
package com.medilytics.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class MultiAuthTokenFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public MultiAuthTokenFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7); // Remove "Bearer "

        String userId = null;

        try {
            // 🔹 Try Firebase token verification first
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
            userId = decodedToken.getUid(); // Firebase UID
            System.out.println("✅ Firebase verified UID: " + userId);

        } catch (Exception firebaseEx) {
            // 🔹 If Firebase fails, try local JWT
            userId = jwtUtil.extractUsername(token); // Usually email or username
            if (userId != null && jwtUtil.validateToken(token)) {
                System.out.println("✅ Local JWT verified userId: " + userId);
            } else {
                // Invalid token for both
                System.err.println("❌ Token verification failed: " + firebaseEx.getMessage());
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                return;
            }
        }

        // ✅ Set the authentication in SecurityContext
        if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(userId, null, Collections.emptyList());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }
}
