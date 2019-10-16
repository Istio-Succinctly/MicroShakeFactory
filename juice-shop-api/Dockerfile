# Test stage
FROM node:12-alpine AS test-stage
WORKDIR /src
COPY . ./
RUN yarn install
RUN yarn global add typescript
RUN yarn test

# Production build stage
FROM node:12-alpine AS build-stage
WORKDIR /src
COPY app/certificates ./certificates
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod
RUN yarn global add typescript
COPY . .
RUN tsc --build --clean && tsc --outDir dist --sourceMap false

# Production stage
FROM node:12-alpine AS build-prod
EXPOSE 3001
ENV NODE_ENV=production
WORKDIR /src
COPY --from=build-stage ./src/certificates ./app/certificates
COPY --from=build-stage ./src/dist/app ./app
COPY --from=build-stage ./src/node_modules ./node_modules
COPY package.json ./
CMD [ "yarn", "start" ]