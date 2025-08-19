import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { User, Phone, MapPin, Clock, Plus, Trash2, Star } from '@phosphor-icons/react'
import { toast } from 'sonner'
import type { CustomerPreferences } from '@/App'

const TIME_SLOTS = [
  '8:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM', 
  '12:00 PM - 2:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
  '6:00 PM - 8:00 PM'
]

export default function CustomerSettings() {
  const [preferences, setPreferences] = useKV<CustomerPreferences>('customer-preferences', {
    name: '',
    phoneNumber: '',
    addresses: [],
    preferredPickupTime: '',
    specialInstructions: ''
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedPreferences, setEditedPreferences] = useState(preferences)
  const [newAddress, setNewAddress] = useState({ label: '', address: '' })
  const [showAddAddress, setShowAddAddress] = useState(false)

  const savePreferences = () => {
    setPreferences(editedPreferences)
    setIsEditing(false)
    toast.success('Preferences saved successfully!')
  }

  const cancelEditing = () => {
    setEditedPreferences(preferences)
    setIsEditing(false)
    setShowAddAddress(false)
    setNewAddress({ label: '', address: '' })
  }

  const addAddress = () => {
    if (!newAddress.label || !newAddress.address) {
      toast.error('Please fill in both label and address')
      return
    }

    const address = {
      id: Date.now().toString(),
      label: newAddress.label,
      address: newAddress.address,
      isDefault: editedPreferences.addresses.length === 0
    }

    setEditedPreferences(prev => ({
      ...prev,
      addresses: [...prev.addresses, address]
    }))

    setNewAddress({ label: '', address: '' })
    setShowAddAddress(false)
    toast.success('Address added!')
  }

  const removeAddress = (addressId: string) => {
    setEditedPreferences(prev => ({
      ...prev,
      addresses: prev.addresses.filter(addr => addr.id !== addressId)
    }))
    toast.success('Address removed')
  }

  const setDefaultAddress = (addressId: string) => {
    setEditedPreferences(prev => ({
      ...prev,
      addresses: prev.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }))
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Settings</h2>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            Edit Preferences
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={cancelEditing}>
              Cancel
            </Button>
            <Button onClick={savePreferences}>
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User size={20} />
            Personal Information
          </CardTitle>
          <CardDescription>
            Your contact information for order communications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={isEditing ? editedPreferences.name : preferences.name}
                onChange={(e) => setEditedPreferences(prev => ({ ...prev, name: e.target.value }))}
                disabled={!isEditing}
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={isEditing ? editedPreferences.phoneNumber : preferences.phoneNumber}
                onChange={(e) => setEditedPreferences(prev => ({ ...prev, phoneNumber: e.target.value }))}
                disabled={!isEditing}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Saved Addresses */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin size={20} />
                Saved Addresses
              </CardTitle>
              <CardDescription>
                Manage your pickup and delivery locations
              </CardDescription>
            </div>
            {isEditing && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowAddAddress(true)}
              >
                <Plus size={16} className="mr-2" />
                Add Address
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {(isEditing ? editedPreferences.addresses : preferences.addresses).map((address) => (
            <div key={address.id} className="flex items-start justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{address.label}</h3>
                  {address.isDefault && (
                    <Badge variant="secondary" className="text-xs">
                      <Star size={12} className="mr-1" />
                      Default
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{address.address}</p>
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  {!address.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDefaultAddress(address.id)}
                    >
                      Set Default
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAddress(address.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              )}
            </div>
          ))}

          {showAddAddress && (
            <div className="p-4 border rounded-lg bg-muted/50">
              <h3 className="font-medium mb-3">Add New Address</h3>
              <div className="space-y-3">
                <Input
                  placeholder="Address label (e.g., Home, Office)"
                  value={newAddress.label}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, label: e.target.value }))}
                />
                <Textarea
                  placeholder="Full address"
                  value={newAddress.address}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, address: e.target.value }))}
                />
                <div className="flex gap-2">
                  <Button onClick={addAddress}>Add Address</Button>
                  <Button variant="outline" onClick={() => setShowAddAddress(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {(isEditing ? editedPreferences.addresses : preferences.addresses).length === 0 && !showAddAddress && (
            <div className="text-center py-8 text-muted-foreground">
              <MapPin size={48} className="mx-auto mb-2 opacity-50" />
              <p>No saved addresses yet</p>
              {isEditing && (
                <Button variant="outline" className="mt-2" onClick={() => setShowAddAddress(true)}>
                  Add your first address
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pickup Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock size={20} />
            Pickup Preferences
          </CardTitle>
          <CardDescription>
            Set your preferred pickup times and special instructions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="preferred-time">Preferred Pickup Time</Label>
            <Select
              value={isEditing ? editedPreferences.preferredPickupTime : preferences.preferredPickupTime}
              onValueChange={(value) => setEditedPreferences(prev => ({ ...prev, preferredPickupTime: value }))}
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select preferred time slot" />
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

          <div className="space-y-2">
            <Label htmlFor="instructions">Default Special Instructions</Label>
            <Textarea
              id="instructions"
              value={isEditing ? editedPreferences.specialInstructions : preferences.specialInstructions}
              onChange={(e) => setEditedPreferences(prev => ({ ...prev, specialInstructions: e.target.value }))}
              disabled={!isEditing}
              placeholder="Any special care instructions or notes for our team..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Service Information */}
      <Card>
        <CardHeader>
          <CardTitle>Service Information</CardTitle>
          <CardDescription>
            Important details about our laundry service
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-medium mb-2">Service Hours</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p>Saturday: 9:00 AM - 6:00 PM</p>
                <p>Sunday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Contact Support</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Phone: (555) 123-WASH</p>
                <p>Email: support@cleancycle.com</p>
                <p>Response time: Within 2 hours</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Service Areas</h3>
            <p className="text-sm text-muted-foreground">
              We currently serve downtown, midtown, and surrounding neighborhoods within a 10-mile radius. 
              Delivery fees may apply for locations beyond our standard service area.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}