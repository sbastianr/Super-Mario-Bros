FROM nginx:alpine

# Copy the static files to the nginx server
COPY . /usr/share/nginx/html

EXPOSE 80 

CMD ["nginx", "-g", "daemon off;"]
