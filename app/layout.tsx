import RequiresAuthUser from './common/RequireAuthUser'
import './globals.css'
import Navigation from './Navigation'
import Providers from './Providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Providers>
          <RequiresAuthUser>
            <Navigation />
            <main>{children}</main>
          </RequiresAuthUser>
        </Providers>
      </body>
    </html>
  )
}
