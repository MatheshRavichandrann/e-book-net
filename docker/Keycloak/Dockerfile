FROM quay.io/keycloak/keycloak:22.0.3

# Set Keycloak environment variables
ENV KC_DB=postgres
ENV KC_DB_URL=jdbc:postgresql://dpg-cu1q9hrtq21c73bk9r7g-a.oregon-postgres.render.com:5432/ebook_86j1
ENV KC_DB_USERNAME=zoro
ENV KC_DB_PASSWORD=R49F0vgaUz9X9VSuoYBlPW3BYyTtRLGv
ENV KC_HOSTNAME=your-keycloak-service-url.render.com
ENV KC_PROXY=edge

# Create Keycloak Admin User (Updated variable names)
ENV KC_BOOTSTRAP_ADMIN_USERNAME=admin
ENV KC_BOOTSTRAP_ADMIN_PASSWORD=admin123

# Build the Keycloak server
RUN /opt/keycloak/bin/kc.sh build

# Expose the default Keycloak port
EXPOSE 8080

# Start the Keycloak server
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start"]
