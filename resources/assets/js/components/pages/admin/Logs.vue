<template>
    <div>
        <div class="card ">
            <div class="card-header">
                <h4>Log Explorer</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-12" style="max-height: 200px; overflow: auto;">
                        <div v-if="currentFolder != '/'" class="fileExplorerIcon" v-on:click="changeFolder('/')">
                            <i class="fa fa-folder-open-o" aria-hidden="true"></i>
                            <span>...</span>
                        </div>
                        <div v-for="folder in folders" class="fileExplorerIcon" v-on:click="changeFolder(folder)">
                            <i class="fa fa-folder-o" aria-hidden="true"></i>
                            <span>{{ folder }}</span>
                        </div>
                        <div v-for="file in files" class="fileExplorerIcon clickable" v-on:click="openFile(file)">
                            <i class="fa fa-file-text-o" aria-hidden="true"></i>
                            <span>{{ file }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card ">
            <div class="card-header">
                <h4>{{ selectedFile }}</h4>
                <input v-model="q" autocomplete="off" type="text" class="tBox tBoxSize01  mt-10" placeholder="Search Logs">
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-12">
                        <ul class="list-group log-list-group">
                            <li v-for="(log, i) in logContent" :key="i" class="list-group-item p-0">
                                <div>
                                    {{ log }}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data: function () {
        return {
            selectedFolder: '/',
            currentFolder: '/',
            selectedFile: '',
            files: [],
            folders: [],
            logContent: false,
            logType: false,
            q: '',
        }
    },
    computed: {
        listUrl: function () {
            return '/logs?folder=' + this.selectedFolder;
        },
        fileUrl: function () {
            return '/logs/view?file=' + this.selectedFile;
        }
    },
    mounted() {
        this.getFolder();
    },
    watch: {
        q: _.debounce(function () {
            this.openFile(this.selectedFile);
        }, 500),
    },

    methods: {
        getFolder: function () {
            axios.get(this.listUrl)
                .then((response) => {
                    this.folders = response.data.folders;
                    this.files = response.data.files;
                    this.currentFolder = this.selectedFolder;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        },
        changeFolder(folder) {
            this.selectedFolder = folder != '/' ? '/' + folder : '/';
            this.getFolder();
        },
        openFile(file) {
            if (this.selectedFile != file) {
                this.selectedFile = '/' + file;
            }

            let search = '';

            if (this.q != '') {
                search = `&q=${this.q}`
            }

            axios.get(this.fileUrl + search)
                .then((response) => {
                    this.logContent = response.data.data.array;
                    this.logType = response.data.data.type;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }
    }
}
</script>
