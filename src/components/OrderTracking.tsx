import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Package, Clock, CheckCircle, Truck, MapPin, Calendar } from '@phosphor-icons/react'
import type { LaundryOrder } from '@/App'

const STATUS_CONFIG = {
  'scheduled': {
    label: 'Scheduled',
    icon: Calendar,
    color: 'bg-blue-500',
    progress: 20,
    description: 'Pickup scheduled'
  },
  'picked-up': {
    label: 'Picked Up',
    icon: Package,
    color: 'bg-yellow-500',
    progress: 40,
    description: 'Items collected'
  },
  'in-progress': {
    label: 'In Progress',
    icon: Clock,
    color: 'bg-orange-500',
    progress: 60,
    description: 'Being cleaned'
  },
  'ready': {
    label: 'Ready',
    icon: CheckCircle,
    color: 'bg-green-500',
    progress: 80,
    description: 'Ready for delivery'
  },
  'delivered': {
    label: 'Delivered',
    icon: Truck,
    color: 'bg-green-600',
    progress: 100,
    description: 'Order complete'
  }
}

function getStatusVariant(status: LaundryOrder['status']) {
  switch (status) {
    case 'scheduled': return 'secondary'
    case 'picked-up': return 'outline'
    case 'in-progress': return 'default'
    case 'ready': return 'default'
    case 'delivered': return 'default'
    default: return 'secondary'
  }
}

function getEstimatedDelivery(order: LaundryOrder): string {
  const pickupDate = new Date(order.pickupDate)
  
  // Estimate delivery based on service type
  const hasExpress = order.services.some(s => s.type.includes('Express'))
  const hasDryCleaning = order.services.some(s => s.type.includes('Dry Cleaning'))
  
  let daysToAdd = 2 // Standard 24-48 hours
  if (hasExpress) daysToAdd = 0 // Same day
  else if (hasDryCleaning) daysToAdd = 3 // Dry cleaning takes longer
  
  const deliveryDate = new Date(pickupDate)
  deliveryDate.setDate(deliveryDate.getDate() + daysToAdd)
  
  return deliveryDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  })
}

export default function OrderTracking() {
  const [orders] = useKV<LaundryOrder[]>('laundry-orders', [])

  const activeOrders = orders.filter(order => order.status !== 'delivered')
  const completedOrders = orders.filter(order => order.status === 'delivered')

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package size={64} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
        <p className="text-muted-foreground mb-6">
          Schedule your first laundry pickup to see orders here
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {activeOrders.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Active Orders</h2>
          <div className="space-y-4">
            {activeOrders.map((order) => {
              const statusConfig = STATUS_CONFIG[order.status]
              const StatusIcon = statusConfig.icon
              
              return (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${statusConfig.color}`} />
                          Order #{order.id.slice(-6)}
                        </CardTitle>
                        <CardDescription>
                          Pickup: {new Date(order.pickupDate).toLocaleDateString()} at {order.pickupTime}
                        </CardDescription>
                      </div>
                      <Badge variant={getStatusVariant(order.status)}>
                        <StatusIcon size={14} className="mr-1" />
                        {statusConfig.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{statusConfig.progress}%</span>
                      </div>
                      <Progress value={statusConfig.progress} className="h-2" />
                      <p className="text-sm text-muted-foreground">{statusConfig.description}</p>
                    </div>

                    {/* Order Details */}
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="font-medium mb-2">Services</h4>
                        <div className="space-y-1">
                          {order.services.map((service, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{service.type} × {service.quantity}</span>
                              <span>${(service.price * service.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Delivery Info</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {order.address.split(',')[0]}...
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-muted-foreground" />
                            <span>Est. delivery: {getEstimatedDelivery(order)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">
                        Total: ${order.totalPrice.toFixed(2)}
                      </span>
                      {order.status === 'ready' && (
                        <Button variant="outline" size="sm">
                          Schedule Delivery
                        </Button>
                      )}
                    </div>

                    {order.specialInstructions && (
                      <div className="mt-3 p-3 bg-muted rounded-lg">
                        <p className="text-sm">
                          <strong>Special Instructions:</strong> {order.specialInstructions}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {completedOrders.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Order History</h2>
          <div className="space-y-4">
            {completedOrders.slice(0, 5).map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-600" />
                        Order #{order.id.slice(-6)}
                      </CardTitle>
                      <CardDescription>
                        Completed on {order.deliveryDate ? 
                          new Date(order.deliveryDate).toLocaleDateString() : 
                          'Unknown date'
                        }
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Delivered
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {order.services.length} service{order.services.length !== 1 ? 's' : ''}
                    </div>
                    <span className="font-semibold">${order.totalPrice.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}