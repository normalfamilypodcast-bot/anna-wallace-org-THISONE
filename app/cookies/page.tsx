import { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy | Anna Wallace',
  description: 'Learn about how we use cookies on annawallace.org to improve your browsing experience.',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
            Cookie Policy
          </h1>
          
          <div className="prose prose-slate max-w-none space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-foreground">What are cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-foreground">How we use cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies on this website to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Remember your cookie consent preferences</li>
                <li>Understand how visitors interact with our website through analytics</li>
                <li>Improve your browsing experience</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-foreground">Types of cookies we use</h2>
              
              <div className="space-y-4">
                <div className="bg-secondary/30 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-2">Essential cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    These cookies are necessary for the website to function properly. They enable basic functions 
                    like page navigation and remembering your cookie preferences. The website cannot function 
                    properly without these cookies.
                  </p>
                </div>

                <div className="bg-secondary/30 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-2">Analytics cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    We use Vercel Analytics to understand how visitors interact with our website. These cookies 
                    help us improve our website by collecting and reporting information anonymously. This includes 
                    data about which pages are visited most often and how visitors navigate through the site.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-foreground">Third-party cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Some cookies are placed by third-party services that appear on our pages. We use:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Vercel Analytics</strong> - for website performance and visitor analytics
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-foreground">Managing cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                You can control and manage cookies in various ways. Most browsers allow you to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>View what cookies are stored and delete them individually</li>
                <li>Block third-party cookies</li>
                <li>Block cookies from particular websites</li>
                <li>Block all cookies from being set</li>
                <li>Delete all cookies when you close your browser</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Please note that if you choose to block or delete cookies, some features of this website may 
                not work as intended.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-foreground">Your consent</h2>
              <p className="text-muted-foreground leading-relaxed">
                When you first visit our website, you will be shown a cookie consent banner. By clicking 
                &quot;Accept&quot;, you consent to our use of cookies as described in this policy. You can withdraw 
                your consent at any time by clearing your browser cookies and revisiting the site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-foreground">Contact us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about our use of cookies, please{' '}
                <Link href="/contact" className="text-primary hover:underline">
                  contact us
                </Link>.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  )
}
