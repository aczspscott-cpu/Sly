export const metadata = {
  title: 'Next.js 14 App Router',
  description: 'A minimal Next.js 14 app using the App Router',
};

const styles = {
  html: {
    fontSize: '16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
  },
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: '#f9fafb',
    color: '#1f2937',
  },
  header: {
    backgroundColor: '#1f2937',
    color: 'white',
    padding: '1.5rem',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  main: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '0 1.5rem',
  },
  footer: {
    backgroundColor: '#1f2937',
    color: 'white',
    textAlign: 'center',
    padding: '2rem 1.5rem',
    marginTop: '3rem',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          {`
            html {
              font-size: ${styles.html.fontSize};
              font-family: ${styles.html.fontFamily};
            }
            body {
              margin: ${styles.body.margin};
              padding: ${styles.body.padding};
              background-color: ${styles.body.backgroundColor};
              color: ${styles.body.color};
            }
          `}
        </style>
      </head>
      <body>
        <header style={styles.header}>
          <h1>Next.js 14 with App Router</h1>
        </header>
        <main style={styles.main}>
          {children}
        </main>
        <footer style={styles.footer}>
          <p>&copy; 2024 Minimal Next.js App. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
