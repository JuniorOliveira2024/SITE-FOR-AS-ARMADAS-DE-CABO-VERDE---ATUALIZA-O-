# ---------- Site das Forças Armadas de Cabo Verde (frontend estático servido por Node) ----------
FROM node:22-alpine
ENV NODE_ENV=production \
    PORT=8080
WORKDIR /app
RUN addgroup -S app && adduser -S app -G app
COPY --chown=app:app package.json server.js ./
COPY --chown=app:app src ./src
USER app
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||8080)+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
# FA_API_BASE (endereço do backend visto pelo navegador) é definido no docker-compose do backend
CMD ["node", "server.js"]
