<template>

    <!--Grid column-->
    <div class="mb-4 natcol-table" :class="[selectedItemId == 0 ? columnClass : 'col-lg-8']">
        <transition name="fade">
            <div class="loader" v-show="loading">Loading...</div>
            <!-- <div class="ellipsis" v-show="loading"><div></div><div></div><div></div><div></div></div> -->
        </transition>
        <!--
        <transition name="fade">
            <div class="loader-background" v-show="loading"></div>
        </transition>    
        -->
        <!--Card-->
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-md-12">
                        <h5><span v-if="!selectedItem.Name">{{ tableTitle }}</span><span v-if="selectedItem.Name">Currently selected: {{ selectedItem.Name }}</span></h5>
                    </div>
                </div>
                <div class="row filters-row">
                    <div class="col-md-4">
                        <form>
                            <div class="form-group">
                                <input v-model="queryString" type="text" class="form-control" id="queryString" placeholder="Search...">
                            </div>      
                        </form>                  
                    </div>              
                </div>
            </div>
            <!--Card content-->
            <div class="card-body">
                <!-- Table  -->
                <table v-show="data.data.length >= 1" class="table table-hover">
                    <!-- Table head -->
                    <thead class="green lighten-4">
                        <tr>
                            <th v-for="(value, key) in data.data[0]">
                                <a v-on:click="setOrder(key)">
                                    {{ key }}
                                    <i v-if="key == orderBy && orderDirection == 'DESC'" class="fa fa-caret-down"></i>
                                    <i v-if="key == orderBy && orderDirection == 'ASC'" class="fa fa-caret-up"></i>
                                </a>
                            </th>
                            <th>Tools</th>
                        </tr>
                    </thead>
                    <!-- Table head -->

                    <!-- Table body -->
                    <!-- <transition-group tag="tbody" name="table-row"> -->
                    <tbody>
                        <tr 
                        class="clickable" 
                        v-on:dblclick="redirect(item[redirectId])"
                        v-bind:class="{ 'selected': item[Object.keys(item)[0]] == selectedItemId }"
                        v-for="item in data.data" 
                        :key="item[Object.keys(item)[0]]"
                        >
                            <td v-for="(value, key) in item">{{ value }}</td>
                            <td>
                                <i 
                                v-on:click="scan(item)" 
                                class="fa fa-barcode" 
                                aria-hidden="true"
                                v-bind:class="{ 'clickable': redirectId}"
                                >
                                </i>
                                <i 
                                v-if="redirectId" 
                                v-on:click="redirect(item[redirectId])" 
                                class="fa fa-search-plus" 
                                aria-hidden="true"
                                v-bind:class="{ 'clickable': redirectId}"
                                >
                                </i>
                            </td>
                        </tr>
                    </tbody>
                    <!-- </transition-group> -->
                    <!-- Table body -->
                </table>
                <!-- Table  -->
                <div v-show="data.data.length <= 0">
                    No data found!
                </div>
            </div>
            <div class="card-footer">
                <div class="paginator pagination example" v-show="data.to > 1">
                    <ul class="pagination pg-blue">

                        <li class="page-item" v-bind:class="{ 'disabled': data.current_page == 1 }">
                            <a class="page-link" aria-label="Previous" v-on:click="changePage(data.current_page - 1)">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        <li class="page-item" v-bind:class="{ 'active': data.current_page == 1 }">
                            <a class="page-link" v-on:click="changePage(1)">
                                1
                            </a>
                        </li>
                        <li class="page-item" v-if="(data.current_page - 1) != 1 && (data.current_page) != 1">
                            <a class="page-link" v-on:click="changePage(data.current_page - 1)">
                                {{ data.current_page - 1 }}
                            </a>
                        </li>
                        <li class="active page-item" v-if="data.current_page != 1">
                            <a class="page-link">
                                {{ data.current_page }}
                            </a>
                        </li>
                        <li class="page-item" v-if="(data.current_page + 1) != data.last_page && (data.current_page) != data.last_page">
                            <a v-on:click="changePage(data.current_page + 1)" class="page-link">
                                {{ data.current_page + 1 }}
                            </a>
                        </li>
                        <li class="page-item" v-if="data.current_page != data.last_page">
                            <a class="page-link" v-on:click="changePage(data.last_page)">
                                {{ data.last_page }}
                            </a>
                        </li>
                        <li class="page-item" v-bind:class="{ 'disabled': data.current_page == data.last_page }">
                            <a class="page-link" aria-label="Next" v-on:click="changePage(data.current_page + 1)">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>                        
                    </ul>
                </div>
                <div class="paginatorInfo" v-if="data.total > 1">
                    Showing {{data.from}} to {{data.to}} of {{data.total}}
                </div>
            </div>
        </div>
        <!--/.Card-->
    </div>
    <!--Grid column-->
</template>

<script>
    import TableComponent from './TableComponent.vue';

    export default {
        props: ['operation'],
        extends: TableComponent,
        data: function () {
            return {
                selectedItem: {},
                selectedItemId: 0,
                focused: false
            }
        },
        mounted() {
            
        },
        updated(){
            if(!this.focused){
                window.scrollTo(0,document.body.scrollHeight);
                this.focused = !this.focused;
            }
        },
        computed: {
        },
        watch: {

        },
        methods: {
            scan(item){
                this.selectedItem = item;
                this.selectedItemId = item[Object.keys(item)[0]];
                this.$emit('scanItemSelected', item);
            }
        }
    }
</script>
