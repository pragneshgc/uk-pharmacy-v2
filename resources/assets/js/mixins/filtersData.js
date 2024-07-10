export default {
    methods: {
        setupFilters() {
            this.filters.find((o, i) => {
                switch (o.value) {
                    case "status":
                        o.options = this.orderStatusesSelect;
                        break;
                    case "status-extended":
                        o.options = this.orderStatusesOptionsComputed;
                        break;
                    case "doctor":
                        axios
                            .get("/doctors")
                            .then((response) => {
                                response.data.data.forEach((doctor) => {
                                    o.options.push({
                                        label:
                                            doctor.Title +
                                            " " +
                                            doctor.Name +
                                            " " +
                                            doctor.Surname,
                                        id: doctor.DoctorID,
                                    });
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        // o.options = this.orderStatusesSelect;
                        break;
                    case "country":
                        axios
                            .get("/countries")
                            .then((response) => {
                                response.data.data.forEach((country) => {
                                    if (
                                        country.CountryID != 1 &&
                                        country.CountryID != 244 &&
                                        country.CountryID != 245
                                    ) {
                                        o.options.push({
                                            label: country.Name,
                                            id: country.CountryID,
                                        });
                                    } else if (country.CountryID == 1) {
                                        o.options.push({
                                            label: country.Name,
                                            id: country.CountryID,
                                            children: [
                                                {
                                                    id: "1-northern-ireland",
                                                    label: "Northern Ireland",
                                                    customLabel: `United Kingdom - Northern Ireland`,
                                                },
                                                {
                                                    id: "1-great-britain",
                                                    label: "Great Britain",
                                                    customLabel: `United Kingdom - Great Britain`,
                                                },
                                                {
                                                    id: 244,
                                                    label: "Jersey",
                                                    customLabel: `United Kingdom - Jersey`,
                                                },
                                                {
                                                    id: 245,
                                                    label: "Guernsey",
                                                    customLabel: `United Kingdom - Guernsey`,
                                                },
                                            ],
                                        });
                                    }
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        // o.options = this.orderStatusesSelect;
                        break;
                    case "gender":
                        //public $genders = ['1' => 'Male', '2' => 'Female', '3' => 'Transgender', '4' => 'For school use'];

                        let options = [
                            { id: "1", label: "Male" },
                            { id: "2", label: "Female" },
                            { id: "3", label: "Transgender" },
                            { id: "4", label: "For school use" },
                        ];

                        o.options = options;
                        break;
                    case "product":
                        axios
                            .get("/products")
                            .then((response) => {
                                response.data.data.forEach((product) => {
                                    o.options.push({
                                        title: product.Name,
                                        value: product.Code,
                                    });
                                    // o.options.push({
                                    //     label: product.Name,
                                    //     id: product.Code
                                    // });
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        // o.options = this.orderStatusesSelect;
                        break;
                    case "delivery":
                        axios
                            .get("/delivery-companies")
                            .then((response) => {
                                response.data.data.forEach((company) => {
                                    o.options.push({
                                        label: company.Name,
                                        id: company.SettingID,
                                    });
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        // o.options = this.orderStatusesSelect;
                        break;
                    case "client":
                        axios
                            .get("/clients")
                            .then((response) => {
                                let inactiveClients = [];

                                response.data.data.forEach((client) => {
                                    if (client.Status == 1) {
                                        o.options.push({
                                            label: client.CompanyName,
                                            id: client.ClientID,
                                        });
                                    } else {
                                        inactiveClients.push({
                                            label: client.CompanyName,
                                            id: client.ClientID,
                                        });
                                    }
                                });

                                if (inactiveClients.length > 0) {
                                    o.options.push({
                                        label: "Inactive",
                                        id: 0,
                                        children: inactiveClients,
                                    });
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        // o.options = this.orderStatusesSelect;
                        break;
                    case "frequency":
                        axios
                            .get(`/orders/frequencies`)
                            .then((response) => {
                                response.data.data.forEach((frequency) => {
                                    o.options.push({
                                        label: frequency.label,
                                        id: frequency.id,
                                    });
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        break;
                    default:
                        break;
                }
            });
        },
    },
};
