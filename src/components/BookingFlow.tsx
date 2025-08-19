import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Plus, Minus, Calendar, MapPin, Phone, User } from '@phosphor-icons/react'
import { toast } from 'sonner'
import type { LaundryOrder, CustomerPreferences } from '@/App'

interface BookingFlowProps {
  onBack: () => void
}

interface ServiceItem {
  type: string
  price: number
  quantity: number
  description: string
}

const AVAILABLE_SERVICES = [
  { type: 'Standard Wash & Fold', price: 2.50, description: 'Per pound - Ready in 24-48 hours' },
  { type: 'Express Wash & Fold', price: 4.00, description: 'Per pound - Same day service' },
  { type: 'Dry Cleaning', price: 8.00, description: 'Per item - Professional dry cleaning' },
  { type: 'Delicate Care', price: 5.00, description: 'Per pound - Hand wash delicate items' },
  { type: 'Bedding & Linens', price: 12.00, description: 'Per item - Comforters, sheets, pillows' },
]

const TIME_SLOTS = [
  '8:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM', 
  '12:00 PM - 2:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
  '6:00 PM - 8:00 PM'
]

export default function BookingFlow({ onBack }: BookingFlowProps) {
  const [orders, setOrders] = useKV<LaundryOrder[]>('laundry-orders', [])
  const [preferences] = useKV<CustomerPreferences>('customer-preferences', {
    name: '',
    phoneNumber: '',
    addresses: [],
    preferredPickupTime: '',
    specialInstructions: ''
  })

  const [step, setStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([])
  const [customerName, setCustomerName] = useState(preferences.name)
  const [phoneNumber, setPhoneNumber] = useState(preferences.phoneNumber)
  const [address, setAddress] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [specialInstructions, setSpecialInstructions] = useState(preferences.specialInstructions)

  const addService = (service: typeof AVAILABLE_SERVICES[0]) => {
    const existing = selectedServices.find(s => s.type === service.type)
    if (existing) {
      setSelectedServices(prev => 
        prev.map(s => s.type === service.type ? { ...s, quantity: s.quantity + 1 } : s)
      )
    } else {
      setSelectedServices(prev => [...prev, {
        type: service.type,
        price: service.price,
        quantity: 1,
        description: service.description
      }])
    }
  }

  const updateQuantity = (type: string, change: number) => {
    setSelectedServices(prev => 
      prev.map(s => {
        if (s.type === type) {
          const newQuantity = Math.max(0, s.quantity + change)
          return newQuantity === 0 ? null : { ...s, quantity: newQuantity }
        }
        return s
      }).filter(Boolean) as ServiceItem[]
    )
  }

  const getTotalPrice = () => {
    return selectedServices.reduce((total, service) => total + (service.price * service.quantity), 0)
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const submitOrder = () => {
    if (!customerName || !phoneNumber || !address || !pickupDate || !pickupTime || selectedServices.length === 0) {
      toast.error('Please fill in all required fields')
      return
    }

    const newOrder: LaundryOrder = {
      id: Date.now().toString(),
      customerName,
      phoneNumber,
      address,
      services: selectedServices,
      totalPrice: getTotalPrice(),
      status: 'scheduled',
      pickupDate,
      pickupTime,
      specialInstructions,
      createdAt: new Date().toISOString()
    }

    setOrders(prev => [...prev, newOrder])
    toast.success('Order scheduled successfully!')
    onBack()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Book Laundry Service</h1>
              <p className="text-sm text-muted-foreground">Step {step} of 3</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Services</CardTitle>
              <CardDescription>Choose the laundry services you need</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {AVAILABLE_SERVICES.map((service) => {
                const selected = selectedServices.find(s => s.type === service.type)
                return (
                  <div key={service.type} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{service.type}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                      <p className="text-lg font-semibold text-primary">${service.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {selected ? (
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" onClick={() => updateQuantity(service.type, -1)}>
                            <Minus size={16} />
                          </Button>
                          <Badge variant="secondary" className="min-w-8 justify-center">
                            {selected.quantity}
                          </Badge>
                          <Button variant="outline" size="icon" onClick={() => updateQuantity(service.type, 1)}>
                            <Plus size={16} />
                          </Button>
                        </div>
                      ) : (
                        <Button variant="outline" onClick={() => addService(service)}>
                          <Plus size={16} className="mr-2" />
                          Add
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}

              {selectedServices.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-medium">Order Summary</h3>
                    {selectedServices.map((service) => (
                      <div key={service.type} className="flex justify-between text-sm">
                        <span>{service.type} × {service.quantity}</span>
                        <span>${(service.price * service.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => setStep(2)}>
                    Continue to Details
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Contact & Address</CardTitle>
              <CardDescription>Where should we pick up your laundry?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-muted-foreground" size={16} />
                    <Input
                      id="name"
                      className="pl-10"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Your full name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-muted-foreground" size={16} />
                    <Input
                      id="phone"
                      className="pl-10"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Pickup Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-muted-foreground" size={16} />
                  <Textarea
                    id="address"
                    className="pl-10 min-h-20"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street address, apartment/unit, city, state, zip code"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button className="flex-1" onClick={() => setStep(3)}>
                  Continue to Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Schedule Pickup</CardTitle>
              <CardDescription>When would you like us to pick up your laundry?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Pickup Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-muted-foreground" size={16} />
                    <Input
                      id="date"
                      type="date"
                      className="pl-10"
                      min={getMinDate()}
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Pickup Time</Label>
                  <Select value={pickupTime} onValueChange={setPickupTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                <Textarea
                  id="instructions"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any special care instructions or notes for our team..."
                />
              </div>

              <Separator />
              
              <div className="space-y-2">
                <h3 className="font-medium">Final Order Summary</h3>
                <div className="text-sm space-y-1">
                  <p><strong>Customer:</strong> {customerName}</p>
                  <p><strong>Phone:</strong> {phoneNumber}</p>
                  <p><strong>Address:</strong> {address}</p>
                  <p><strong>Pickup:</strong> {pickupDate} at {pickupTime}</p>
                </div>
                <div className="border-t pt-2">
                  {selectedServices.map((service) => (
                    <div key={service.type} className="flex justify-between text-sm">
                      <span>{service.type} × {service.quantity}</span>
                      <span>${(service.price * service.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button className="flex-1" onClick={submitOrder}>
                  Schedule Pickup
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}