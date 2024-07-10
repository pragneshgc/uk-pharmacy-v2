<template>
    <div>
        <div class="paginator pagination example" v-show="data.to > 1">
            <div class="pagination pg-blue">
                <button class="page-item" :disabled="data.current_page == 1 || loading" :class="{ 'disabled': data.current_page == 1 || loading }"
                @click="changePage(data.current_page - 1)">
                    <a class="page-link" aria-label="Previous">
                        <i class="fa fa-caret-left"></i>
                    </a>
                </button>
                <button class="page-item" :class="{ 'active': data.current_page == 1 }" @click="changePage(1)">
                    1
                </button>
                <button class="page-item" v-if="(data.current_page - 1) != 1 && (data.current_page) != 1" @click="changePage(data.current_page - 1)">
                    {{ data.current_page - 1 }}
                </button>
                <button class="active page-item" v-if="data.current_page != 1">
                    {{ data.current_page }}
                </button>
                <button class="page-item" v-if="(data.current_page + 1) != data.last_page && (data.current_page) != data.last_page" @click="changePage(data.current_page + 1)">
                    {{ data.current_page + 1 }}
                </button>
                <button class="page-item" v-if="data.current_page != data.last_page && data.last_page" @click="changePage(data.last_page)">
                    {{ data.last_page }}
                </button>
                <button class="page-item" :disabled="data.current_page == data.last_page || loading" 
                :class="{ 'disabled': data.current_page == data.last_page || loading }" @click="changePage(data.current_page + 1)">
                    <a class="page-link" aria-label="Next" >
                        <i class="fa fa-caret-right"></i>
                    </a>
                </button>                        
            </div>
            <slot name="paginationnumberslot"></slot>
        </div>
        <div class="paginatorInfo" v-if="data.total > 1">
            Showing {{data.from}} to {{data.to}} of {{data.total}}
        </div>        
        <div class="paginatorInfo" v-else-if="customTotal && customPaginate">
            Found {{ customPaginate.total }} results
        </div>
    </div>
</template>

<script>
export default {
    props:{
        data: {Type: [String, Array], default: () => {}},
        customTotal: {Type: [String], default: '0'},
        customPaginate: {Type: [String, Array], default: () => {}},
        loading: {Type: [Boolean], default: true},
    },
    data(){
      return {}  
    },
    methods: {
        changePage(page){
            this.$emit('click', page);
        }
    },
}
</script>