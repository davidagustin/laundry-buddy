# Laundry Service Application PRD

A streamlined digital platform that connects customers with professional laundry services, enabling easy scheduling, tracking, and payment for laundry pickup and delivery.

**Experience Qualities**:
1. **Effortless** - Booking and managing laundry services should feel as simple as ordering food delivery
2. **Trustworthy** - Clear pricing, reliable tracking, and professional presentation build confidence in the service
3. **Convenient** - Quick scheduling with flexible pickup/delivery times that fit busy lifestyles

**Complexity Level**: Light Application (multiple features with basic state)
- The app handles service booking, order tracking, and customer preferences but doesn't require complex user accounts or payment processing beyond basic calculations

## Essential Features

### Service Booking
- **Functionality**: Schedule laundry pickup with service type selection and address details
- **Purpose**: Core value proposition - easy access to professional laundry services
- **Trigger**: User clicks "Schedule Pickup" from main screen
- **Progression**: Select services → Choose date/time → Enter address → Review order → Confirm booking
- **Success criteria**: Booking appears in order history with pickup details and estimated completion

### Order Tracking
- **Functionality**: View current orders with status updates from pickup to delivery
- **Purpose**: Reduces anxiety and builds trust through transparency
- **Trigger**: User selects "Track Orders" or clicks on existing order
- **Progression**: View order list → Select specific order → See detailed status timeline → Estimated delivery time
- **Success criteria**: Clear status communication with realistic timing expectations

### Service Pricing Calculator
- **Functionality**: Real-time price estimation based on service type and quantity
- **Purpose**: Transparent pricing eliminates booking hesitation
- **Trigger**: User selects services during booking flow
- **Progression**: Choose service types → Input quantity → See price breakdown → Confirm pricing
- **Success criteria**: Accurate price calculation that matches final billing

### Customer Preferences
- **Functionality**: Save delivery addresses, preferred service times, and special instructions
- **Purpose**: Streamlines repeat bookings for regular customers
- **Trigger**: User accesses settings or during first booking
- **Progression**: Enter preferences → Save to profile → Apply to future bookings → Edit as needed
- **Success criteria**: Preferences auto-populate in booking forms and can be easily modified

## Edge Case Handling

- **No Available Time Slots**: Show alternative dates and allow waitlist signup for preferred times
- **Address Validation Errors**: Provide clear correction guidance and suggest valid nearby addresses
- **Service Area Limitations**: Gracefully communicate coverage boundaries with alternative solutions
- **Incomplete Orders**: Auto-save booking progress and allow resumption from any step
- **Pricing Changes**: Lock in quoted prices during booking session with clear expiration times

## Design Direction

The design should feel professional yet approachable - like a premium service that's accessible to everyone, combining the reliability of a traditional dry cleaner with the convenience of modern delivery apps. A clean, minimal interface that emphasizes trust and efficiency over flashy elements.

## Color Selection

Complementary (opposite colors) - Using calming blue as primary with warm accents to balance professionalism with approachability, creating trust while feeling inviting.

- **Primary Color**: Deep Ocean Blue (oklch(0.45 0.15 240)) - Communicates reliability, cleanliness, and professionalism
- **Secondary Colors**: 
  - Soft Cloud Gray (oklch(0.95 0.01 240)) for backgrounds and cards
  - Fresh Linen White (oklch(0.98 0.005 240)) for main backgrounds
- **Accent Color**: Warm Sunrise Orange (oklch(0.7 0.15 45)) - Friendly call-to-action color for booking buttons and important highlights
- **Foreground/Background Pairings**:
  - Background (Fresh Linen White oklch(0.98 0.005 240)): Dark Navy Text (oklch(0.2 0.02 240)) - Ratio 14.8:1 ✓
  - Card (Soft Cloud Gray oklch(0.95 0.01 240)): Dark Navy Text (oklch(0.2 0.02 240)) - Ratio 12.1:1 ✓
  - Primary (Deep Ocean Blue oklch(0.45 0.15 240)): White Text (oklch(0.98 0.005 240)) - Ratio 8.2:1 ✓
  - Accent (Warm Sunrise Orange oklch(0.7 0.15 45)): Dark Navy Text (oklch(0.2 0.02 240)) - Ratio 6.8:1 ✓

## Font Selection

Typography should convey cleanliness and efficiency with a friendly, modern feel - Inter provides excellent readability while feeling contemporary and trustworthy.

- **Typographic Hierarchy**:
  - H1 (Page Titles): Inter Bold/32px/tight letter spacing
  - H2 (Section Headers): Inter Semibold/24px/normal letter spacing  
  - H3 (Card Titles): Inter Medium/18px/normal letter spacing
  - Body Text: Inter Regular/16px/relaxed line height (1.6)
  - Small Text (prices, details): Inter Medium/14px/normal letter spacing
  - Button Text: Inter Semibold/16px/normal letter spacing

## Animations

Subtle and purposeful - animations should guide users through the booking process and provide satisfying feedback without delaying interactions, emphasizing the efficient nature of the service.

- **Purposeful Meaning**: Smooth transitions reinforce the "effortless" brand quality, while gentle micro-interactions (button hover states, form field focus) create confidence in each step
- **Hierarchy of Movement**: Booking confirmation gets celebratory animation, status updates have gentle transitions, form interactions provide immediate feedback

## Component Selection

- **Components**: 
  - Cards for service options and order summaries
  - Button variants (primary for booking, secondary for navigation)
  - Form components (Input, Select, Textarea) for booking details
  - Badge for order status indicators
  - Calendar for date selection
  - Tabs for switching between services/tracking views
  - Dialog for order confirmations
  - Progress indicators for multi-step booking

- **Customizations**: 
  - Custom service selection cards with pricing
  - Order timeline component for tracking
  - Address input with validation feedback

- **States**:
  - Buttons: Default, hover (slight lift + color shift), active (pressed state), disabled (booking unavailable)
  - Inputs: Default, focused (blue border + subtle glow), error (orange border + helper text), success (green accent)
  - Cards: Default, hover (subtle elevation), selected (blue border + background tint)

- **Icon Selection**: 
  - Phosphor icons throughout for consistency
  - MapPin for addresses, Calendar for scheduling, Package for orders, Clock for timing
  - CheckCircle for completed steps, Truck for delivery status

- **Spacing**: 
  - Consistent 4px base unit (Tailwind spacing scale)
  - 16px gaps between cards, 24px section spacing, 8px between related elements

- **Mobile**: 
  - Mobile-first approach with single-column layouts
  - Touch-friendly button sizes (min 44px height)
  - Simplified navigation with tab bar for main sections
  - Collapsible booking form steps on smaller screens