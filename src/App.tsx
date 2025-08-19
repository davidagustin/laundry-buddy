import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package, Calendar, Settings, Plus } from '@phosphor-icons/react'
import BookingFlow from '@/components/BookingFlow'
import OrderTracking from '@/components/OrderTracking'
import CustomerSettings from '@/components/CustomerSettings'

export interface LaundryOrder {
  id: string
  customerName: string
  phoneNumber: string
  address: string
  services: Array<{
    type: string
    quantity: number
    price: number
  }>
  totalPrice: number
  status: 'scheduled' | 'picked-up' | 'in-progress' | 'ready' | 'delivered'
  pickupDate: string
  pickupTime: string
  deliveryDate?: string
  specialInstructions?: string
  createdAt: string
}

export interface CustomerPreferences {
  name: string
  phoneNumber: string
  addresses: Array<{
    id: string
    label: string
    address: string
    isDefault: boolean
  }>
  preferredPickupTime: string
  specialInstructions: string
}

function App() {
  const [orders] = useKV<LaundryOrder[]>('laundry-orders', [])
  const [activeTab, setActiveTab] = useState('book')
  const [showBooking, setShowBooking] = useState(false)

  const pendingOrders = orders.filter(order => order.status !== 'delivered').length

  if (showBooking) {
    return <BookingFlow onBack={() => setShowBooking(false)} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">CleanCycle</h1>
              <p className="text-sm text-muted-foreground">Professional Laundry Service</p>
            </div>
            {pendingOrders > 0 && (
              <Badge variant="secondary" className="text-sm">
                {pendingOrders} active order{pendingOrders !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="book" className="flex items-center gap-2">
              <Plus size={16} />
              Book Service
            </TabsTrigger>
            <TabsTrigger value="track" className="flex items-center gap-2">
              <Package size={16} />
              Track Orders
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings size={16} />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="book" className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Schedule Your Pickup</h2>
              <p className="text-muted-foreground mb-8">
                Professional laundry service with convenient pickup and delivery
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Quick Service Cards */}
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setShowBooking(true)}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Package className="text-primary" size={24} />
                    </div>
                    Standard Service
                  </CardTitle>
                  <CardDescription>
                    Wash, dry, and fold. Ready in 24-48 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">$2.50/lb</span>
                    <span className="text-sm text-muted-foreground">Starting price</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setShowBooking(true)}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Calendar className="text-accent" size={24} />
                    </div>
                    Express Service
                  </CardTitle>
                  <CardDescription>
                    Same-day service. Ready in 4-6 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-accent">$4.00/lb</span>
                    <span className="text-sm text-muted-foreground">Rush pricing</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <h3 className="font-medium mb-1">Schedule Pickup</h3>
                    <p className="text-sm text-muted-foreground">Choose your services and pickup time</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <h3 className="font-medium mb-1">We Clean</h3>
                    <p className="text-sm text-muted-foreground">Professional washing and folding</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <h3 className="font-medium mb-1">Fresh Delivery</h3>
                    <p className="text-sm text-muted-foreground">Clean clothes delivered to your door</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="track">
            <OrderTracking />
          </TabsContent>

          <TabsContent value="settings">
            <CustomerSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App