# Test stage
FROM node:12-alpine AS test-stage
WORKDIR /src
COPY . ./
RUN yarn install
RUN yarn global add typescript
RUN yarn test

# Compile stage
FROM node:12-alpine AS build-stage
WORKDIR /src
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod
RUN yarn global add typescript
COPY . .
RUN tsc --build --clean && tsc --outDir dist --sourceMap false

# Production stage
FROM node:12-alpine AS build-prod
ARG app_version
EXPOSE 3000
ENV NODE_ENV=production
ENV app_version ${app_version}
WORKDIR /src
COPY --from=build-stage ./src/dist/app ./app
COPY --from=build-stage ./src/node_modules ./node_modules
COPY package.json ./
CMD [ "yarn", "start" ]