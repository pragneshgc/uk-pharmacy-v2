<ESAReporting Priority="Normal" Version="1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <OrderID>{{ $order->ReferenceNumber }}</OrderID>
    <OrderStatus>{{ $status }}</OrderStatus>
    <User>Admin</User>
    <Message>{{$message}}</Message>
   <NewDate>{{ $date }}</NewDate>
</ESAReporting>