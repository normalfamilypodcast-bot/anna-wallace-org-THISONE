import { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Anna Wallace',
  description: 'Learn about how we collect, use, and protect your personal information on annawallace.org.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-slate max-w-none space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-foreground">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                This Privacy Policy explains how Anna Wallace (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, 
                and protects your personal information when you visit annawallace.org. We are committed to 
                ensuring that your privacy is protected and that we comply with applicable data protection laws.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-foreground">Information we collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may collect the following types of information:
              </p>
              
              <div className="space-y-4">
                <div className="bg-secondary/30 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-2">Information you provide</h3>
                  <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                    <li>Name and email address when you use our contact form</li>
                    <li>Email address when you subscribe to our newsletter</li>
                    <li>Account information (name, email, password) when you create an account to access premium content</li>
                    <li>Payment and billing information when you purchase subscriptions or premium content (processed securely by our payment provider)</li>
                    <li>Any other information you choose to share with us through communications</li>
                  </ul>
                </div>

                <div className="bg-secondary/30 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-2">Information collected automatically</h3>
                  <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                    <li>Anonymous usage data through Vercel Analytics (page views, referral sources)</li>
                    <li>Technical information such as browser type and device type</li>
                    <li>Cookie preferences and consent choices</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-foreground">How we use your information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>To respond to your enquiries and communications</li>
                <li>To send you newsletters and updates you have subscribed to</li>
                <li>To manage your account and provide access to premium content</li>
                <li>To process payments and manage subscriptions</li>
                <li>To send transactional emails (account confirmations, payment receipts, subscription updates)</li>
                <li>To improve our website and user experience</li>
                <li>To understand how visitors use our website</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-foreground">Legal basis for processing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We process your personal data based on:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Consent</strong> - when you submit a contact form, subscribe to our newsletter, or accept cookies</li>
                <li><strong>Contract</strong> - when you create an account or purchase a subscription, processing is necessary to fulfil our agreement with you</li>
                <li><strong>Legitimate interests</strong> - to improve our website and services</li>
                <li><strong>Legal obligation</strong> - when required by law (including financial record-keeping requirements)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-foreground">Data sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share 
                your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Service providers</strong> - such as our website hosting provider (Vercel) who 
                help us operate our website</li>
                <li><strong>Payment processors</strong> - to securely process payments for subscriptions and premium content (we do not store your full payment card details)</li>
                <li><strong>Email service providers</strong> - to deliver newsletters and transactional emails</li>
                <li><strong>Legal authorities</strong> - when required by law or to protect our rights</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-foreground">Data retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information only for as long as necessary to fulfil the purposes 
                for which it was collected, or as required by law:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Contact form submissions</strong> - retained for a reasonable period to allow us to respond and maintain records of communications</li>
                <li><strong>Newsletter subscriptions</strong> - retained until you unsubscribe, after which your email is removed from our mailing list</li>
                <li><strong>Account information</strong> - retained for as long as your account is active, plus a reasonable period after account closure</li>
                <li><strong>Payment records</strong> - retained as required by financial and tax regulations (typically 6-7 years)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-foreground">Newsletter subscriptions</h2>
              <p className="text-muted-foreground leading-relaxed">
                When you subscribe to our newsletter, we collect your email address to send you updates, 
                articles, and other content. You can unsubscribe at any time by clicking the unsubscribe 
                link in any newsletter email or by contacting us directly. We will process your 
                unsubscribe request promptly.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-foreground">Premium content and subscriptions</h2>
              <p className="text-muted-foreground leading-relaxed">
                When you create an account or purchase access to premium content:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>We create a secure account using your email and password (passwords are encrypted and never stored in plain text)</li>
                <li>Payment information is processed securely by our third-party payment provider - we do not have access to your full card details</li>
                <li>We maintain records of your subscription status to provide access to content you have purchased</li>
                <li>You can manage your subscription, update your details, or cancel at any time through your account settings</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-foreground">Your rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                Under data protection laws, you have the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Access</strong> - request a copy of your personal data</li>
                <li><strong>Rectification</strong> - request correction of inaccurate data</li>
                <li><strong>Erasure</strong> - request deletion of your personal data</li>
                <li><strong>Restriction</strong> - request limitation of processing</li>
                <li><strong>Portability</strong> - request transfer of your data</li>
                <li><strong>Objection</strong> - object to processing based on legitimate interests</li>
                <li><strong>Withdraw consent</strong> - withdraw consent at any time where processing is based on consent</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                To exercise any of these rights, please{' '}
                <Link href="/contact" className="text-primary hover:underline">
                  contact us
                </Link>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-foreground">Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website uses cookies to enhance your browsing experience. For detailed information 
                about the cookies we use and how to manage them, please see our{' '}
                <Link href="/cookies" className="text-primary hover:underline">
                  Cookie Policy
                </Link>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-foreground">Third-party links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to external websites (such as podcast platforms and social 
                media). We are not responsible for the privacy practices of these external sites. We 
                encourage you to read the privacy policies of any external websites you visit.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-foreground">Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We take reasonable measures to protect your personal information from unauthorised access, 
                use, or disclosure:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Our website uses HTTPS encryption to secure all data transmission</li>
                <li>Passwords are securely hashed and never stored in plain text</li>
                <li>Payment processing is handled by PCI-compliant payment providers</li>
                <li>Access to personal data is restricted to authorised personnel only</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                However, no method of transmission over the internet is completely secure, and we cannot 
                guarantee absolute security.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-foreground">Changes to this policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this 
                page with an updated revision date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-foreground">Contact us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy or wish to exercise your data 
                protection rights, please{' '}
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
