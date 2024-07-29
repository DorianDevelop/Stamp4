FROM node:14 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM httpd:2.4
COPY --from=build-stage /app/dist/ /usr/local/apache2/htdocs/
COPY ./public/.htaccess /usr/local/apache2/htdocs/.htaccess

# Ensure mod_rewrite is enabled and .htaccess files are processed
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf \
    && echo "<Directory \"/usr/local/apache2/htdocs\">" >> /usr/local/apache2/conf/httpd.conf \
    && echo "    AllowOverride All" >> /usr/local/apache2/conf/httpd.conf \
    && echo "    Require all granted" >> /usr/local/apache2/conf/httpd.conf \
    && echo "</Directory>" >> /usr/local/apache2/conf/httpd.conf
