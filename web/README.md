This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Script Commands

Scripts defined in `"scripts"` of [package.json](/package.json) and are runnable using
`yarn {script}`

| Script            | Description                                            |
| ----------------- | ------------------------------------------------------ |
| **`plop`**        | Generate a new component/page's source files.          |
| **`fix`**         | Executes all `fix:*` and `format commands in sequence. |
| **`fix:eslint`**  | Executes `eslint:lint` and fixes fixable errors.       |
| **`format`**      | Formats the source files using `prettier`.             |
| **`lint`**        | Executes all `lint:*` commands in sequence.            |
| **`lint:eslint`** | Lints the source files using `eslint`.                 |
| **`typecheck`**   | Synchronously runs `typecheck:main`.                   |

<hr />

## Scaffolding components

The scaffolding tool in this project is [Plop](https://plopjs.com/) and the template files are
located in the [plop-templates](./plop-templates) directory

You can run the following command to scaffold a new component or page:

```sh
yarn plop
```

It will guide you through the process and everything should be self-explanatory.

<hr />

## Project Structure

### [source](./src)

#### [src/components](./src/components)

The `components` folder follows [atomic design](https://bradfrost.com/blog/post/atomic-web-design/)
guidelines, with a few additions:

| Folder           | Description                                                                                                                        | Example                        |
|------------------|------------------------------------------------------------------------------------------------------------------------------------| ------------------------------ |
| **`/atoms`**     | The smallest unit, must be self contained and not dependant on any external modules. (types and configuration being the exception) | `Icon`, `Heading` |
| **`/molecules`** | Must be restrained to only use atoms and minimal internal state.                                                                   | `Toggle`                       |
| **`/organisms`** | Generally reserved for complex state uses and must use `atoms` or `molecules`.                                                     | `Form`                         |
| **`/layout`**    | This is reserved for the global layout                                                                                             | `SiteHeader, Footer, etc`      |
| **`/blocks`**    | This is reserved for the CMS Block components only                                                                                 | `HeroBlock`                    |
| **`/unlisted`**  | Components which do not fall into any of the above categories.                                                                     | _global context providers_     |

<hr />

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
