import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  Phone, 
  Clock, 
  Shirt, 
  Sparkles, 
  Shield, 
  Star,
  Mail
} from '@phosphor-icons/react'

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">CleanCycle</h1>
              <p className="text-sm text-muted-foreground">Professional Laundry & Dry Cleaning</p>
            </div>
            <div className="hidden md:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Phone size={16} className="text-primary" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} className="text-primary" />
                <span>Mon-Sat 7AM-7PM</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Professional Laundry &
            <span className="text-primary block">Dry Cleaning Services</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Quality cleaning services you can trust. Family-owned business serving the community for over 15 years.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              <Phone className="mr-2" size={20} />
              Call Now
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              <MapPin className="mr-2" size={20} />
              Get Directions
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Services</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From everyday laundry to delicate dry cleaning, we handle your garments with care and expertise.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Laundry Service */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shirt className="text-primary" size={24} />
                  </div>
                  Laundry Service
                </CardTitle>
                <CardDescription>
                  Professional wash, dry, and fold service for your everyday clothing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Wash & Fold</span>
                    <span className="font-medium">$1.75/lb</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wash & Hang</span>
                    <span className="font-medium">$2.25/lb</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Minimum order</span>
                    <span>10 lbs</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dry Cleaning */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Sparkles className="text-accent" size={24} />
                  </div>
                  Dry Cleaning
                </CardTitle>
                <CardDescription>
                  Expert care for your delicate fabrics, suits, and formal wear.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Suits (2-piece)</span>
                    <span className="font-medium">$12.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dresses</span>
                    <span className="font-medium">$8.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shirts</span>
                    <span className="font-medium">$4.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pants</span>
                    <span className="font-medium">$6.99</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specialty Services */}
            <Card className="h-full md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Shield className="text-secondary-foreground" size={24} />
                  </div>
                  Specialty Services
                </CardTitle>
                <CardDescription>
                  Specialized care for your most valued items.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Wedding Dress</span>
                    <span className="font-medium">$89.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Leather/Suede</span>
                    <span className="font-medium">$24.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Comforters</span>
                    <span className="font-medium">$19.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Alterations</span>
                    <span className="font-medium">Quote</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Why Choose CleanCycle?</h3>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Star className="text-primary" size={32} />
              </div>
              <h4 className="text-xl font-semibold mb-2">15+ Years Experience</h4>
              <p className="text-muted-foreground">
                Family-owned business with a reputation for quality and reliability in the community.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-accent" size={32} />
              </div>
              <h4 className="text-xl font-semibold mb-2">Expert Care</h4>
              <p className="text-muted-foreground">
                Professional-grade equipment and eco-friendly cleaning solutions for the best results.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="text-secondary-foreground" size={32} />
              </div>
              <h4 className="text-xl font-semibold mb-2">Fast Turnaround</h4>
              <p className="text-muted-foreground">
                Most items ready within 2-3 business days. Same-day service available for urgent needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Visit Our Store</CardTitle>
                <CardDescription>
                  Conveniently located in downtown with easy parking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin className="text-primary mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">
                      123 Main Street<br />
                      Downtown, CA 90210
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="text-primary mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="text-primary mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">info@cleancycle.com</p>
                  </div>
                </div>

                <Button className="w-full">
                  <MapPin className="mr-2" size={20} />
                  Get Directions
                </Button>
              </CardContent>
            </Card>

            {/* Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Store Hours</CardTitle>
                <CardDescription>
                  We're here when you need us most
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Monday - Friday</span>
                    <span>7:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Saturday</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2 border-t">
                    <span className="font-medium">Sunday</span>
                    <Badge variant="secondary">Closed</Badge>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm text-accent-foreground">
                    <strong>Holiday Hours:</strong> We're closed on major holidays. 
                    Please call ahead during holiday weeks for updated hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h4 className="font-bold text-lg">CleanCycle</h4>
              <p className="text-sm text-muted-foreground">
                Professional Laundry & Dry Cleaning Since 2008
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Phone size={16} />
                (555) 123-4567
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={16} />
                123 Main Street, Downtown, CA 90210
              </span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CleanCycle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App