FROM node:20-slim
WORKDIR /app
COPY . .
RUN npm install
# Install the Antigravity CLI for Linux
RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://antigravity.google/cli/install.sh | bash
ENV PATH="/root/.local/agy/bin:${PATH}"
CMD ["npm", "start"]