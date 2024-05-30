import { Roboto, EB_Garamond } from 'next/font/google';
// import localFont from 'next/font/local';

export const serif = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

export const sansSerif = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-sans-serif',
  fallback: ['helvetica', 'arial', 'sans-serif'],
});

// export const foo = localFont({
//     src: [
//         {
//             path: './foo/foo-regular.woff2',
//             weight: '400',
//         },
//     ],
//     display: 'swap',
//     fallback: ['sans-serif'],
// });

// export default fonts;
