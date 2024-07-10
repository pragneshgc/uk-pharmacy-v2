<template>
    <div>
        <div class="content">
            <section>
                <div class="orderSearch">
                    <data-table 
                    :data-url="`/orders/duplicate/${reference}`" column-class="col-lg-12" table-title="Prescriptions" 
                    redirect-name="prescription" redirect-id="PrescriptionID"
                    :hidden-columns="['checked', 'disabled']"
                    :column-map="{
                        'PrescriptionID': 'ID',
                        'DeliveryID': 'Courier',
                        'CompanyName': 'Client',
                        'ReferenceNumber': 'Ref',
                    }"
                    ></data-table>                    
                </div>
            </section>
        </div>     
    </div>
</template>

<script>
    import Error from '../../mixins/errors'

    export default {
        mixins: [ Error ],
        data: function () {
            return {
                statistics: {},
                loaded: false,
                userInfo: userInfo,
                reference: this.$route.params.id,
                roleVisibility: {
                    '60': [],
                    '50': [],
                    '40': ['dpd', 'call', 'onhold'],
                    '30': []
                }
            }
        },
        computed: {

        },
        mounted() {

        },
        destroyed() {
        },
        methods: {
     
        },
    }
</script>
