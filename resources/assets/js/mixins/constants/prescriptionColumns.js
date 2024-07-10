export default {
    data() {
        return {
            /**
             * Aliases and values for all edit order address columns
             */
            alias: {
                //PRESCRIPTION
                Name: { 
                    title: 'Name', 
                    value: 35,
                    combined: 'Surname',
                },
                Surname: {
                    title: 'Surname', 
                    value: 35,
                    combined: 'Name'
                },
                DAddress1: { 
                    title: 'Delivery Address Line 1',
                    value: 35,
                    combined: false,
                },
                DAddress2: { 
                    title: 'Delivery Address Line 2', 
                    value: 35,
                    combined: false,
                },
                DAddress3: { 
                    title: 'Delivery Town', 
                    value: 35,
                    combined: false,
                },
                DAddress4: { 
                    title: 'Delivery Province', 
                    value: 35,
                    combined: false,
                },
                
                DPostcode: { 
                    title: 'Delivery Postcode', 
                    value: false,
                    combined: false,
                },
                DCountryCode: { 
                    title: 'Delivery Country', 
                    value: false,
                    combined: false,
                },
                Address1: { 
                    title: 'Home Address Line 1', 
                    value: 35,
                    combined: false,
                },
                Address2: { 
                    title: 'Home Address Line 2', 
                    value: 35,
                    combined: false,
                },
                Address3: { 
                    title: 'Home Town', 
                    value: 35,
                    combined: false,
                },
                Address4: { 
                    title: 'Home Province', 
                    value: 35,
                    combined: false,
                },
                Postcode: { 
                    title: 'Home Postcode', 
                    value: false,
                    combined: false,
                },
                CountryCode: { 
                    title: 'Home Country',
                    value: false,
                    combined: false,
                 },
                Telephone: { 
                    title: 'Telephone', 
                    value: false,
                    combined: false,
                },
                Email: { 
                    title: 'Email', 
                    value: false,
                    combined: false,
                },
                Notes: { 
                    title: 'Notes', 
                    value: false,
                    combined: false,
                },
                Repeats: { 
                    title: 'Commercial Value', 
                    value: false,
                    combined: false,
                },
                TokenID: { 
                    title: 'COD Amount',
                    value: false,
                    combined: false,
                },
                TrackingCode: { 
                    title: 'Tracking Code', 
                    value: false,
                    combined: false,
                },
                DeliveryID: { 
                    title: 'Delivery Company',
                    value: false,
                    combined: false,
                },
                APNotificationLanguage: { 
                    title: 'UPS Notification Language', 
                    value: false,
                    combined: false,
                },
                APNotificationValue: { 
                    title: 'UPS Notification Email', 
                    value: false,
                    combined: false,
                },
                UPSAccessPointAddress: { 
                    title: 'Access Point', 
                    value: false,
                    combined: false,
                },
                JVM: { 
                    title: 'Pouch Order', 
                    value: false,
                    combined: false,
                },
                UPSAccessPoint: { 
                    title: 'UPS Access Point ID', 
                    value: false,
                    combined: false,
                },
                SaturdayDelivery: {
                    title: 'Saturday Delivery',
                    value: false,
                    combined: false,
                },
            },
        }
    },
}