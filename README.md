# Doc-Write: Online Tool

Online document writer tool. Our platform is designed to simplify your document management and collaboration process, making it as intuitive and efficient as possible.

## Tech Stack

**Client:** React, Next.js, Typescript, Zustand, TailwindCSS, Chakra UI

**Server:** Firebase, Clerk (For Authentication)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`= (Availaible on Clerk Auth)

`CLERK_SECRET_KEY`=(Availaible on Clerk Auth)

`NEXT_PUBLIC_CLERK_SIGN_IN_URL` =/sign-in

`NEXT_PUBLIC_CLERK_SIGN_UP_URL`=/sign-up

## Run Locally

Clone the project

```bash
  git clone https://github.com/abhinavkr2108/doc-write
```

Go to the project directory

```bash
  cd doc-write
```

Install dependencies

```bash
  pnpm add
```

Start the server

```bash
  pnpm dev
```

## Screenshots

![App Screenshot](https://firebasestorage.googleapis.com/v0/b/docwrite-38576.appspot.com/o/Screenshot%20from%202024-05-12%2011-38-48.png?alt=media&token=87381890-6492-492a-ac38-c9387a8f2a80)

![App Screenshot](https://firebasestorage.googleapis.com/v0/b/docwrite-38576.appspot.com/o/Screenshot%20from%202024-05-12%2011-39-39.png?alt=media&token=130b21e0-3d45-41a8-bdd7-d3110d43e87f)

![App Screenshot](https://firebasestorage.googleapis.com/v0/b/docwrite-38576.appspot.com/o/Screenshot%20from%202024-05-12%2011-39-59.png?alt=media&token=ed8a115a-fe58-4535-b9e3-a91b28f52f49)
