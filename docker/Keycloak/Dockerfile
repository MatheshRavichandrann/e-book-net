# Use the official Keycloak image
FROM quay.io/keycloak/keycloak:22.0.3

# Set Keycloak environment variables
ENV KC_DB=postgres \
    KC_DB_URL=jdbc:postgresql://dpg-cu1q9hrtq21c73bk9r7g-a.oregon-postgres.render.com:5432/ebook_86j1 \
    KC_DB_USERNAME=zoro \
    KC_DB_PASSWORD=R49F0vgaUz9X9VSuoYBlPW3BYyTtRLGv \
    KC_PROXY=edge \
    KC_HOSTNAME=https://keycloak-latest-hq1q.onrender.com \
    KC_HTTP_ENABLED=true

# Bootstrap Keycloak admin user
ENV KC_BOOTSTRAP_ADMIN_USERNAME=admin \
    KC_BOOTSTRAP_ADMIN_PASSWORD=admin123

# Build the Keycloak server
RUN /opt/keycloak/bin/kc.sh build

# Expose Keycloak port
EXPOSE 8080

# Start Keycloak server
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start"]
